const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const Admin = require('./models/Admin');
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');



const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

mongoose.connect('mongodb://localhost:27017/AdminSignup')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


app.post('/api/admin/signup', upload.single('profile'), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      profile: req.file?.path
    });

    await newAdmin.save();
    res.json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ error: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

    res.json({ message: 'Login successful', admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin', async (req, res) => {
  const admins = await Admin.find();
  res.json(admins);
});

app.put('/api/admin/:id', upload.single('profile'), async (req, res) => {
  try {
    const { name, email } = req.body;
    const updateData = { name, email };

    if (req.file) updateData.profile = req.file.path;

    const updated = await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ message: 'Admin updated', admin: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/admin/:id', async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (admin?.profile && fs.existsSync(admin.profile)) {
    fs.unlinkSync(admin.profile); // delete image
  }
  await Admin.findByIdAndDelete(req.params.id);
  res.json({ message: 'Admin deleted' });
});



app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, category, isOffer } = req.body;
    const product = new Product({
      name,
      price,
      description,
      category,
      isOffer,
      image: req.file?.path,
    });
    await product.save();
    res.json({ message: 'Product added', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, category, isOffer } = req.body;
    const updateData = { name, price, description, category, isOffer };

    if (req.file) updateData.image = req.file.path;

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ message: 'Product updated', product: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product?.image && fs.existsSync(product.image)) {
    fs.unlinkSync(product.image);
  }
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

app.post('/api/users', upload.single('profile'), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      profile: req.file?.path,
    });
    await user.save();
    res.json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.put('/api/users/:id', upload.single('profile'), async (req, res) => {
  try {
    const { name, email } = req.body;
    const updateData = { name, email };
    if (req.file) updateData.profile = req.file.path;

    const updated = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ message: 'User updated', user: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user?.profile && fs.existsSync(user.profile)) {
    fs.unlinkSync(user.profile);
  }
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

app.post('/api/orders', async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
    });

    await newOrder.save();
    res.json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/orders', async (req, res) => {
  const orders = await Order.find().populate('userId').populate('items.productId');
  res.json(orders);
});

app.put('/api/orders/:id', async (req, res) => {
  const { status } = req.body;
  const updated = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json({ message: 'Order status updated', order: updated });
});

app.delete('/api/orders/:id', async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order deleted' });
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
