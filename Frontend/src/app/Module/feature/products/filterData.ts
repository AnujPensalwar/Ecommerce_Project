// MULTI SELECT FILTERS
export const filters = [

  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "beige", label: "Beige" },
      { value: "blue", label: "Blue" },
      { value: "brown", label: "Brown" },
      { value: "green", label: "Green" },
      { value: "purple", label: "Purple" },
      { value: "yellow", label: "Yellow" },
      { value: "black", label: "Black" }
    ]
  },

  {
    id: "size",
    name: "Size",
    options: [
      { value: "S", label: "Small" },
      { value: "M", label: "Medium" },
      { value: "L", label: "Large" },
      { value: "XL", label: "Extra Large" }
    ]
  }

];



// SINGLE SELECT FILTERS
export const singleFilters = [

  {
    id: "price",
    name: "Price",
    options: [
      { value: "0-499", label: "Under ₹499" },
      { value: "500-999", label: "₹500 - ₹999" },
      { value: "1000-1999", label: "₹1000 - ₹1999" },
      { value: "2000-3999", label: "₹2000 - ₹3999" },
      { value: "4000+", label: "Above ₹4000" }
    ]
  },

  {
    id: "discount",
    name: "Discount",
    options: [
      { value: "10", label: "10% or more" },
      { value: "20", label: "20% or more" },
      { value: "30", label: "30% or more" },
      { value: "40", label: "40% or more" },
      { value: "50", label: "50% or more" }
    ]
  },

  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "in_stock", label: "In Stock" },
      { value: "out_of_stock", label: "Out Of Stock" }
    ]
  }

];
