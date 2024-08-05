"use client";

import React, { useEffect, useState } from "react";
import { ref, get, child } from "@firebase/database";
import { Hero } from "./Hero";
import { Toolbar } from "./Toolbar";
import { Searchbar } from "./Searchbar";
import { PantryCard, PantryItem } from "./PantryCard";
import { db } from "../utils/firebaseConfig";
import { Title } from "./Title";
import axios from "axios";

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

export const LandingPage: React.FC = () => {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PantryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PantryItem | null>(null);

  async function getPantryItems() {
    const dbRef = ref(db);

    try {
      const snapshot = await get(child(dbRef, "pantry-items"));
      if (snapshot.exists()) {
        const items = await Promise.all(
          Object.entries(snapshot.val()).map(async ([id, data]) => {
            const itemData = data as Omit<PantryItem, "id" | "image">;
            const imageUrl = await fetchImageFromPexels(itemData.name);
            return { id, ...itemData, image: imageUrl };
          })
        );
        setPantryItems(items as PantryItem[]);
        setFilteredItems(items as PantryItem[]);
      } else {
        console.log("No data available");
      }
    } catch (error: any) {
      console.error("Error fetching pantry items:", error.message);
    }
  }

  const fetchImageFromPexels = async (query: string) => {
    try {
      const response = await axios.get("https://api.pexels.com/v1/search", {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
        params: {
          query,
          per_page: 1,
        },
      });

      const photo = response.data.photos[0];
      return photo ? photo.src.medium : "";
    } catch (error) {
      console.error("Error fetching image from Pexels:", error);
      return "";
    }
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = pantryItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  useEffect(() => {
    getPantryItems();
  }, []);

  return (
    <div className="relative">
      <section className="w-full min-h-screen font-sans bg-slate-200" id="hero">
        <Hero />
      </section>
      <section
        id="pantry"
        className="w-full min-h-screen font-sans bg-gradient-to-r from-green-500 via-green-600 to-green-700"
      >
        <Title />
        <div id="tool-bar">
          <Toolbar
            refreshPantryItems={getPantryItems}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </div>
        <Searchbar onSearch={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 sm:gap-20 md:gap-40 lg:gap-5 gap-y-5 sm:gap-y-12 md:gap-y-5 lg:gap-y-5">
          {filteredItems.map((item) => (
            <PantryCard
              key={item.id}
              item={item}
              onSelect={setSelectedItem}
              isSelected={selectedItem?.id === item.id}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
