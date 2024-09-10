"use client";

import CartController from "@/controllers/Cart";
import { useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import { useEffect } from "react";

function SyncCartToDatabase() {
  const queryClient = useQueryClient();
  const refAlreadySync = useRef(false);

  useEffect(() => {
    async function sync_carrinho() {
      const cart = new CartController();
      await cart.sync_carrinho_to_database();
      queryClient.invalidateQueries({ queryKey: ["carrinho"] });
    }

    if (!refAlreadySync.current) {
      refAlreadySync.current = true;
      sync_carrinho();
    }
  }, [queryClient]);

  return <></>;
}

export default React.memo(SyncCartToDatabase);
