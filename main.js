var ProductNameInput = document.getElementById("ProductName");
var ProductPriceInput = document.getElementById("ProductPrice");
var ProductCategoryInput = document.getElementById("ProductCategory");
var ProductDiscriptionInput = document.getElementById("ProductDiscription");
var ProductCountInput = document.getElementById("ProductCount");

//Events
var buttonAddProducts = document.getElementById("buttonAdd");
var inputSearchProducts = document.getElementById("searchInput");

// get Element from localStorage
var ProductsContainer;
if (localStorage.getItem("Products") == null) {
    ProductsContainer = [];
} else {
    ProductsContainer = JSON.parse(localStorage.getItem("Products"));
    dispalyProducts(ProductsContainer);
}


// addProducts
function addProduct() {
    if (validateProductName() === true) {
        var Product = {
            Name: ProductNameInput.value,
            Count: ProductCountInput.value,
            Price: ProductPriceInput.value,
            Category: ProductCategoryInput.value,
            Discription: ProductDiscriptionInput.value,
        };
        ProductsContainer.push(Product);
        localStorage.setItem("Products", JSON.stringify(ProductsContainer));
        dispalyProducts(ProductsContainer);
        clearForm();
    } else {
        alert("Non Validate Name");
    }
}

//dispaly Products
function dispalyProducts(ProductsList) {
    var allProducts = ``;
    // ✅ FIX what different if i make this var allProducts; only ??????? why must var allProducts = ``or "" or '' ; ====> because i use  allProducts += .. and if the first undefine you will make product undefine in first  
    for (var i = 0; i < ProductsList.length; i++) {
        allProducts += `<tr>
                    <td>${i}</td>
                    <td>${ProductsList[i].Name}</td>
                    <td>${ProductsList[i].Count}</td>
                    <td>${ProductsList[i].Price}</td>
                    <td>${ProductsList[i].Category}</td>
                    <td>${ProductsList[i].Discription}</td>
                    <td><button onclick="CountOfProduct(${i} , ${1});" class="btn btn-info"><i class="fas fa-plus-circle"></i></button></td>
                    <td><button onclick="CountOfProduct(${i} , ${-1});" class="btn btn-info"><i class="fas fa-minus-circle"></i></button></td>
                    <td><button onclick="uploadProduct(${i})" class="btn btn-warning">update</button></td>
                    <td><button onclick="deleteProduct(${i})" class="btn btn-danger">detele</button></td>
                </tr>
                `
    }
    document.getElementById("tableRow").innerHTML = allProducts;
}

// Increase and decrease Count of Products
function CountOfProduct(index, IncDec) {

    if (ProductsContainer[index].Count === 0 && Number(IncDec) === -1) {
        ProductsContainer[index].Count = 0;
    } else {
        ProductsContainer[index].Count = Number(ProductsContainer[index].Count) + Number(IncDec);
        localStorage.setItem("Products", JSON.stringify(ProductsContainer));
        dispalyProducts(ProductsContainer);
    }

}

//Clear Form After Add products
function clearForm() {
    ProductNameInput.value = "";
    ProductCountInput.value = "";
    ProductPriceInput.value = "";
    ProductCategoryInput.value = "";
    ProductDiscriptionInput.value = "";
}

//delete Products
function deleteProduct(productIndex) {
    ProductsContainer.splice(productIndex, 1);
    localStorage.setItem("Products", JSON.stringify(ProductsContainer));
    dispalyProducts(ProductsContainer);
    // console.log(ProductsContainer);
}

//Update Products
var updateIndex = null; // shared variable between 2 functions (uploadProduct + UpdateProduct)
function uploadProduct(productIndex) {
    updateIndex = productIndex;
    ProductNameInput.value = ProductsContainer[productIndex].Name;
    ProductCountInput.value = ProductsContainer[productIndex].Count;
    ProductPriceInput.value = ProductsContainer[productIndex].Price;
    ProductCategoryInput.value = ProductsContainer[productIndex].Category;
    ProductDiscriptionInput.value = ProductsContainer[productIndex].Discription;
    buttonAddProducts.innerHTML = "update Product";
}
function UpdateProduct(productIndex) {
    ProductsContainer[productIndex].Name = ProductNameInput.value;
    ProductsContainer[productIndex].Count = ProductCountInput.value;
    ProductsContainer[productIndex].Price = ProductPriceInput.value;
    ProductsContainer[productIndex].Category = ProductCategoryInput.value;
    ProductsContainer[productIndex].Discription = ProductDiscriptionInput.value;
    buttonAddProducts.innerHTML = "Add Product";
    localStorage.setItem("Products", JSON.stringify(ProductsContainer));
    dispalyProducts(ProductsContainer);
    clearForm();
}

//search Products
function searchProducts(term) {

    var productSearch = [];
    for (var i = 0; i < ProductsContainer.length; i++) {
        if (ProductsContainer[i].Name.toLowerCase().trim().includes(term.toLowerCase().trim())) {
            productSearch.push(ProductsContainer[i]);
        }
    }
    dispalyProducts(productSearch);
    // console.log(productSearch);
}

// Event Addition & Update
buttonAddProducts.addEventListener('click', function () {
    if (buttonAddProducts.innerHTML == "update Product") {
        UpdateProduct(updateIndex);
    } else {
        addProduct();
    }
})

// Event Search
inputSearchProducts.addEventListener('keyup', function () {
    searchProducts(this.value); //this =inputSearchProducts 
})

// Regex 
function validateProductName() {
    var regex = /^[A-Z][a-z]{3,8}$/;
    if (regex.test(ProductNameInput.value)) {
        return true;
    } else {
        return false;
    }
}
