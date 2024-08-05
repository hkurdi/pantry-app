"use client";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";
import { ref, set, update, remove } from "@firebase/database";
import { db } from "../utils/firebaseConfig";
import { PantryItem } from "../components/PantryCard";

interface ToolbarProps {
  refreshPantryItems: () => void;
  selectedItem: PantryItem | null;
  setSelectedItem: (item: PantryItem | null) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ refreshPantryItems, selectedItem, setSelectedItem }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");

  const handleAddPantryItems = async () => {
    try {
      const newItemRef = ref(db, "pantry-items/" + Date.now());
      await set(newItemRef, {
        name: itemName,
        description: itemDescription,
        quantity: parseInt(itemQuantity, 10),
      });
      refreshPantryItems();
      handleClose();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleEditPantryItems = async () => {
    if (selectedItem) {
      try {
        const itemRef = ref(db, "pantry-items/" + selectedItem.id);
        await update(itemRef, {
          name: itemName,
          description: itemDescription,
          quantity: parseInt(itemQuantity, 10),
        });
        refreshPantryItems();
        handleClose();
      } catch (error) {
        console.error("Error editing item:", error);
      }
    }
  };

  const handleDeletePantryItems = async () => {
    if (selectedItem) {
      try {
        const itemRef = ref(db, "pantry-items/" + selectedItem.id);
        await remove(itemRef);
        refreshPantryItems();
        handleClose();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleClose = () => {
    setOpenAddModal(false);
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setItemName("");
    setItemDescription("");
    setItemQuantity("");
    setSelectedItem(null);
  };

  const handleEditClick = () => {
    if (selectedItem) {
      setItemName(selectedItem.name);
      setItemDescription(selectedItem.description || "");
      setItemQuantity(selectedItem.quantity.toString());
      setOpenEditModal(true);
    }
  };

  const handleDeleteClick = () => {
    if (selectedItem) {
      setOpenDeleteModal(true);
    }
  };

  return (
    <div className="relative pb-12 pt-4">
      <div className="flex justify-center items-center h-24">
        <div className="flex flex-col w-full gap-x-7 justify-center items-center min-h-screen">
          <div className="mt-5 max-w-[55rem] w-full flex flex-col items-center gap-y-4">
            <div className="w-full flex flex-1 flex-row items-center gap-x-9 h-fit">
              <Button
                variant="outlined"
                className="w-full"
                sx={{
                  backgroundColor: "#0a781a",
                  borderColor: "#1A202C",
                  color: "#000",
                  borderRadius: "999px",
                  padding: "0.8rem 3rem",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#094f14",
                    color: "#E2E8F0",
                    borderColor: "#2D3748",
                    boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
                    transform: "scale(1.05)",
                  },
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
                onClick={() => setOpenAddModal(true)}
              >
                Add Item
              </Button>
              <Button
                variant="outlined"
                className="w-full"
                sx={{
                  backgroundColor: "#F6AD55",
                  borderColor: "#DD6B20",
                  color: "#000",
                  borderRadius: "999px",
                  padding: "0.8rem 3rem",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#DD6B20",
                    color: "#E2E8F0",
                    borderColor: "#F6AD55",
                    boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
                    transform: "scale(1.05)",
                  },
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
                onClick={handleEditClick}
                disabled={!selectedItem}
              >
                Edit Item
              </Button>
              <Button
                variant="outlined"
                className="w-full text-nowrap"
                sx={{
                  backgroundColor: "#E53E3E",
                  borderColor: "#C53030",
                  color: "#000",
                  borderRadius: "999px",
                  padding: "0.8rem 3rem",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#C53030",
                    color: "#FFFFFF",
                    borderColor: "#E53E3E",
                    boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
                    transform: "scale(1.05)",
                  },
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
                onClick={handleDeleteClick}
                disabled={!selectedItem}
              >
                Delete Item
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={openAddModal} onClose={handleClose}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Item Name"
            type="text"
            fullWidth
            variant="outlined"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            variant="outlined"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddPantryItems}>Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditModal} onClose={handleClose}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Item Name"
            type="text"
            fullWidth
            variant="outlined"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            variant="outlined"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditPantryItems}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteModal} onClose={handleClose}>
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the selected item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeletePantryItems} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
