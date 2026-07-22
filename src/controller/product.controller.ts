import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const ulrParts = url?.split("/");
  // console.log(ulrParts);

  const id =
    ulrParts && ulrParts[1] === "products" ? Number(ulrParts[2]) : null;

  // console.log("this is the id", id);

  // const products = [
  //   { id: 1, name: "Product 1", price: 10.99 },
  //   { id: 2, name: "Product 2", price: 15.99 },
  //   { id: 3, name: "Product 3", price: 20.99 }
  // ];

  const products = readProduct();

  if (url === "/products" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "This is products route from controller",
        products,
      }),
    );
  } else if (method === "GET" && id !== null) {
    const products = readProduct();
    const product = products.find((p: IProduct) => (p.id === id));
    // console.log(product);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "This is product route from controller",
        product,
      }),
    );
  }
};
