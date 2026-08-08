import Cart from "../models/Cart.js";
import Menu from "../models/Menu.js";

// ============================
// Add To Cart
// ============================

export const addToCart = async (req, res) => {

    try {

        const { menuItem, quantity } = req.body;

        const item = await Menu.findById(menuItem);

        if (!item) {

            return res.status(404).json({

                success: false,

                message: "Menu Item Not Found"

            });

        }

        const existingItem = await Cart.findOne({

            user: req.user._id,

            menuItem

        });

        if (existingItem) {

            existingItem.quantity += Number(quantity || 1);

            await existingItem.save();

            return res.status(200).json({

                success: true,

                message: "Cart Updated Successfully",

                cart: existingItem

            });

        }

        const cart = await Cart.create({

            user: req.user._id,

            menuItem,

            quantity: quantity || 1

        });

        res.status(201).json({

            success: true,

            message: "Item Added To Cart",

            cart

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
// Get My Cart
// ============================

export const getMyCart = async (req, res) => {

    try {

        const cart = await Cart.find({
            user: req.user._id
        })
            .populate("menuItem")
            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            count: cart.length,

            cart

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
// Update Cart Quantity
// ============================

export const updateCartItem = async (req, res) => {

    try {

        const cart = await Cart.findById(req.params.id);

        if (!cart) {

            return res.status(404).json({

                success: false,

                message: "Cart Item Not Found"

            });

        }

        cart.quantity = req.body.quantity;

        await cart.save();

        res.status(200).json({

            success: true,

            message: "Cart Updated Successfully",

            cart

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
// Remove Cart Item
// ============================

export const removeCartItem = async (req, res) => {

    try {

        const cart = await Cart.findById(req.params.id);

        if (!cart) {

            return res.status(404).json({

                success: false,

                message: "Cart Item Not Found"

            });

        }

        await cart.deleteOne();

        res.status(200).json({

            success: true,

            message: "Item Removed From Cart"

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
// Clear Cart
// ============================

export const clearCart = async (req, res) => {

    try {

        await Cart.deleteMany({

            user: req.user._id

        });

        res.status(200).json({

            success: true,

            message: "Cart Cleared Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};