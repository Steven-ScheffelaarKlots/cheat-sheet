const { Console } = require("console");
const fs = require("fs");


//Read the tsv files, and then return them as an array 0f [value0, value1]
const parseTsv = (path) => {
  const file = fs.readFileSync(path, "utf-8");

  const lines = file
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.map((line) => {
    const values = line.split("\t");
    return values;
  });
};

const calculateTotalSales = (sales) => {
  console.log(sales[0]);
  let totalSales = 0;
  sales.forEach((element) => {
    totalSales += parseFloat(element[1]);
  });

  return [totalSales.toFixed(2), sales.length];
};

const calculateCategorySales = (sales, getCategory) => {
  const totals = {};

  sales.forEach((sale) => {
    const category = getCategory(sale[0]);
    totals[category] = (totals[category] || 0.0) + parseFloat(sale[1]);
  });

  return totals;
};

function getTopCategoriesByRevenue(categoryTotals, topN = 5) {
  return Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1]) // descending by revenue
    .slice(0, topN)
    .map(([category, total]) => ({ category, total }));
}

//Creates a map of products to categories
const createCategoryLookup = (products) => {
  const productMap = new Map();
  products.forEach((p) => {
    productMap.set(p[0], p[1]);
  });

  return (getCategory = (productName) => {
    return productMap.get(productName) || "Unknown product";
  });
};

const main = () => {
  const [, , salesPath, productsPath] = process.argv;

  //Importing the tsv files and parsing them
  if (!salesPath || !productsPath) {
    console.error("No file path for sales or products");
    return;
  }
  const sales = parseTsv(salesPath); // Returns [[product, price]]
  const products = parseTsv(productsPath); // Returns [[product, category]]

  let [totalSalesValue, totalSales] = calculateTotalSales(sales);

  console.log(
    "Question 1: Total sales value are: $",
    totalSalesValue,
    "and amount of sales is: ",
    totalSales
  );

  const getCategory = createCategoryLookup(products); // Create a lookup for what category a product belongs to

  const categoryTotals = calculateCategorySales(sales, getCategory);

  console.log(
    "Question 2: Top 5 categories by revenue",
    getTopCategoriesByRevenue(categoryTotals)
  );

  //Question 3
  //Do something similar to getTopCategoriesByRevenue, except pass it what category you want to find (In this case candy)
  //Loop through sales, find a products category using the lookup, if it matches the selected category, create a value for it in an object, and add the values
};

main();
