/* Cart Reducer */
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD-TO-CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE-FROM-CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c._id !== action.payload._id),
      };
    case "CLEAR_CART":
      return {};
    default:
      return state;
  }
};
/* Fetch Product Reducer */
export const ProductReducer = (state, action) => {
  switch (action.type) {
    case "Fetch_Success":
      return {
        product: action.payload,
        error: "",
      };
    case "Fetch_Error":
      return {
        product: {},
        error: "some thing went wrong!",
      };
    default:
      return state;
  }
};
/*filter reducer*/
export const searchReducer = (state, action) => {
  switch (action.type) {
    case "FILTER_PRODUCT":
      return {
        ...state,
        searchQuery: action.payload, //...state uses previous value of searchQuery b//c search query should hold the current payload!!!
      };
    default:
      return state;
  }
};

/*Login Reducer!*/
export const loginReducer = (state, action) => {
  switch (action.type) {
    case "email":
      return {
        ...state,
        email: action.payload,
      };

    case "password":
      return {
        ...state,
        password: action.payload,
      };

    default:
      return state;
  }
};
/*Add category Reducer!*/
export const addcategoryReducer = (state, action) => {
  switch (action.type) {
    case "Fetch_Success":
      return {
        ...state,
        categ: action.payload,
      };
    default:
      return state;
  }
};
