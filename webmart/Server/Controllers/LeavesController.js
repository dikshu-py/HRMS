// Add New Leave
const Item = require('../Models/Leaves');

exports.addLeave = async (req, res) => {
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
exports.getAllLeaves = async (req, res) => {
  try {
    const search = req.query.searchKey?.trim() || "";
    const status =  req.query.status?.trim() || "";
    const position =  req.query.position?.trim() || "";
    console.log("worki ")
    var items;
    const query = {};
    if (search) {
      const regex = new RegExp(search, 'i');
      query.name = regex;
      
    } 
    if (status) {
      query.status = status; // exact match on status
    }
    items = await Item.find(query);

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

// Delete product by ID
exports.removeLeaves = async (req, res) => {
  try {
    console.log(req.params.id)
    const item = await Item.findOneAndDelete({_id : req.params.id});
    if (!item) {
        
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.status(200).json({ success: true, message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to delete item", error: err.message });
  }
};


exports.getLeavebyID = async (req, res) => {
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

exports.updateLeavedata = async (req, res) => {
  try {
    console.log(req.params.id)
    console.log(req.body)
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
