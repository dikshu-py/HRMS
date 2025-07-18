const Item = require('../Models/Items');

// Add product
exports.addProduct = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json({
      success: true,
      message: "Item added successfully",
      data: item
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Failed to add item", error: err.message });
  }
};

// Get all products (with optional search by name)
exports.getAllProducts = async (req, res) => {
  try {
    const search = req.query.search?.trim() || "";
    let items;

    if (search) {
      const regex = new RegExp(search, 'i');
      items = await Item.find({ name: regex });
    } else {
      items = await Item.find();
    }

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch item", error: err.message });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // this will replace it over old 
    );
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.status(200).json({ success: true, message: "Item updated successfully", data: item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update item", error: err.message });
  }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.status(200).json({ success: true, message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to delete item", error: err.message });
  }
};
