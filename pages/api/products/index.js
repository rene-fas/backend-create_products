import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export default async function handler(request, response) {
  await dbConnect();

  switch (request.method) {
    case "GET":
      const products = await Product.find();
      return response.status(200).json(products);
      break;
    case "POST":
      try {
        const productData = request.body;
        const newProduct = await Product.create(productData);
        return response.status(201).json({ status: "Product created." });
      } catch (error) {
        console.error(error);
        return response.status(400).json({ error: error.message });
      }
      break;
    default:
      return response.status(405).json({ error: "Method not allowed." });
  }
}
