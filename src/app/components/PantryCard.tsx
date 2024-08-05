"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export interface PantryItem {
  id: string;
  name: string;
  description?: string;
  image: string;
  quantity: number;
}

interface PantryCardProps {
  item: PantryItem;
  onSelect: (item: PantryItem) => void;
  isSelected: boolean;
}

export const PantryCard: React.FC<PantryCardProps> = ({
  item,
  onSelect,
  isSelected,
}) => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 300,
        bgcolor: "rgba(0, 0, 0, 0.7)",
        color: "white",
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        m: 2,
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
        border: isSelected ? "2px solid #FFD700" : "none",
      }}
      onClick={() => onSelect(item)}
    >
      <CardHeader
        sx={{ height: 180, p: 0 }}
        title={
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        }
      />
      <CardContent sx={{ textAlign: "center", padding: "36px" }}>
        <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
          <div className="font-mono uppercase">
            <br />
            <span className="text-white text-md font-bold">{item.name}</span>
            <br />
            <span className="text-gray-200 text-sm">
              Quantity: {item.quantity}
            </span>
            <br />
            {item.description && (
              <span className="text-gray-300 text-xs">{item.description}</span>
            )}
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
};
