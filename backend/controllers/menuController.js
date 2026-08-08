import Menu from "../models/Menu.js";
import Restaurant from "../models/Restaurant.js";

// ============================
// Add Menu Item
// ============================

export const addMenuItem = async (req, res) => {

    try {

        const restaurant = await Restaurant.findOne({
            owner: req.user._id
        });

        if (!restaurant) {

            return res.status(404).json({
                success: false,
                message: "Restaurant Not Found"
            });

        }

        const menu = await Menu.create({

            restaurant: restaurant._id,

            name: req.body.name,

            description: req.body.description,

            category: req.body.category,

            price: req.body.price,

            image: req.file
                ? `/uploads/menu/${req.file.filename}`
                : ""

        });

        res.status(201).json({

            success: true,

            message: "Menu Item Added Successfully",

            menu

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ============================
// Get My Restaurant Menu
// ============================

export const getMyMenu = async (req, res) => {

    try {

        const restaurant = await Restaurant.findOne({
            owner: req.user._id
        });

        if (!restaurant) {

            return res.status(404).json({
                success: false,
                message: "Restaurant Not Found"
            });

        }

        const menu = await Menu.find({
            restaurant: restaurant._id
        }).sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            count: menu.length,

            menu

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ============================
// Update Menu Item
// ============================

export const updateMenuItem = async (req, res) => {

    try {

        const menu = await Menu.findById(req.params.id);

        if (!menu) {

            return res.status(404).json({
                success: false,
                message: "Menu Item Not Found"
            });

        }

        Object.assign(menu, req.body);

        if (req.file) {

            menu.image = `/uploads/menu/${req.file.filename}`;

        }

        await menu.save();

        res.status(200).json({

            success: true,

            message: "Menu Updated Successfully",

            menu

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ============================
// Delete Menu Item
// ============================

export const deleteMenuItem = async (req, res) => {

    try {

        const menu = await Menu.findById(req.params.id);

        if (!menu) {

            return res.status(404).json({

                success: false,

                message: "Menu Item Not Found"

            });

        }

        await menu.deleteOne();

        res.status(200).json({

            success: true,

            message: "Menu Item Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ============================
// Get Menu By Restaurant
// ============================

export const getRestaurantMenu = async (req, res) => {

    try {

        const menu = await Menu.find({
            restaurant: req.params.restaurantId,
            isAvailable: true
        });

        res.status(200).json({

            success: true,

            count: menu.length,

            menu

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};