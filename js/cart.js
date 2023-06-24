// This component represents an item in a product list.
// It displays the item's image, name, description, price, and a button to add the item to the cart.
// The component uses Vue.js directives and data binding to dynamically render the item details.
// It iterates over an array of items and generates the necessary HTML for each item using the v-for directive.
// The addToCart method is called when the "Add to Cart" button is clicked, and it emits an event to notify the parent component about the action.

Vue.component('item',{
    // Vue component template
    template:
        `
    <div class="row my-5 row-cols-5">
        <div class="img-thumbnail d-flex align-items-center justify-content-center" v-for="item in items">
            <div>
                <img v-bind:src="item.imageURL" class="item">
                <p class="items-header fs-5">{{item.name}}</p>
                <p class="item-description">{{item.desc}}</p>
                <p class="discounted-price">\${{item.price}}</p>
                <p class="price"><del>\${{item.originalPrice}}</del></p>
                <div class="d-flex justify-content-center">
                    <button class="btn btn-primary" v-on:click="addToCart">Add To Cart <i class="bi bi-cart"></i></button>
                </div>
            </div>
    </div>
    </div>
    `,
    data() {
        return {
            // Array of data items
            items:[
                {
                    name: 'iPhone 14 Pro',
                    price: 1999,
                    originalPrice: 2999,
                    desc: 'Seamless sophistication in your palm',
                    imageURL:'img/iphone-14-pro.png',
                },
                {
                    name: 'iPhone 14',
                    price: 1899,
                    originalPrice: 2099,
                    desc: 'Seamless sophistication in your palm',
                    imageURL:'img/iphone-14.png',
                },
                {
                    name: 'iPhone 13',
                    price: 1799,
                    originalPrice: 1999,
                    desc: 'Effortless elegance meets cutting-edge technology',
                    imageURL:'img/iphone-13.png',
                },
                {
                    name: 'iPhone 12',
                    price: 1699,
                    originalPrice: 1899,
                    desc: 'Unleash the extraordinary with Apple\'s masterpiece',
                    imageURL:'img/iphone-12.png',
                },
                {
                    name: 'iPhone SE',
                    price: 1599,
                    originalPrice: 1699,
                    desc: 'Unlock limitless possibilities, one touch at a time.',
                    imageURL:'img/iphone-se.png',
                },
            ],
        }
    },
    // Method to add item to cart
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart')
        }
    }
})

// This component represents a shopping cart.
// It displays a list of selected items, their prices, quantities, and the total amount.
// The component uses Vue.js directives and data binding to dynamically render the cart items.
// It iterates over an array of items and generates the necessary HTML for each item using the v-for directive.
// The component provides functionality to increase or decrease the quantity of an item, calculate the total amount,
// and select/deselect items using checkboxes.
// The toggleCheckbox method is called when the "Select All" checkbox is clicked, and it updates the selection status of all items in the cart.

Vue.component('cart',{
    template:
    `
    <div class="cart-layout my-5">
        <div class="row row-cols-5">
            <div class="cart-title form-check">
                <input type="checkbox" class="mx-2" v-on:change="toggleCheckbox" id="checkall">
                <span>Select All</span>
            </div>
            <p class="cart-title">Items</p>
            <p class="cart-title">Price</p>
            <p class="cart-title">Quantities</p>
            <p class="cart-title">Amount</p>
        </div>

        <!--            items -->
        <div class="row row-cols-5 my-4" v-for="item in items">
            <div class="text-center">
                <input type="checkbox" v-on:change="calculateTotalAmount(item,items.indexOf(item))" v-bind:id="items.indexOf(item)">
            </div>
            <div class="text-center row row-cols-2">
                <img v-bind:src="item.imageURL" class="img">
                <div>
                    <p>{{item.name}}</p>
                    <i class="bi bi-credit-card-fill"></i>
                    <i class="bi bi-paypal"></i>
                    <i class="bi bi-patch-check-fill"></i>
                </div>
            </div>
            <div class="text-center"><span class="price">\${{item.price}}</span></div>

            <div class="text-center">
                <button v-on:click="minus(item,items.indexOf(item))"><i class="bi bi-dash"></i></button>
                <span>{{item.quantities}}</span>
                <button v-on:click="plus(item,items.indexOf(item))"><i class="bi bi-plus"></i></button>
            </div>
            <div class="text-center"><span class="price">\${{ calculateAmount(item) }}</span></div>
        </div>

        <!--            checkout-->
        <div class="row  fw-bold fs-5">
            <div class="d-flex justify-content-center my-5">
                <span class="price">Total (include GST): \${{totalPrice}}</span>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            items:[
                {
                    name: 'iPhone 14 Pro',
                    price: 1999,
                    quantities: 1,
                    imageURL:'img/iphone-14-pro.png'
                },
                {
                    name: 'iPhone 14',
                    price: 1899,
                    quantities: 1,
                    imageURL:'img/iphone-14.png'
                },
                {
                    name: 'iPhone 13',
                    price: 1799,
                    quantities: 1,
                    imageURL:'img/iphone-13.png'
                },
                {
                    name: 'iPhone 12',
                    price: 1699,
                    quantities: 1,
                    imageURL:'img/iphone-12.png'
                },
                {
                    name: 'iPhone SE',
                    price: 1599,
                    quantities: 1,
                    imageURL:'img/iphone-se.png'
                },
            ],
            totalPrice: 0
        }
    },

    methods: {
        plus: function (item,index) {
            item.quantities ++
            // Restriction
            let checkbox = document.getElementById(index).checked
            if (checkbox) {
                this.totalPrice += item.price
            }
        },
        minus: function (item,index) {
            if (item.quantities > 1) {
                item.quantities --

                let checkbox = document.getElementById(index).checked
                if (checkbox) {
                    this.totalPrice -= item.price
                }
            }
        },
        calculateAmount: function (item) {
            return item.price * item.quantities
        },
        calculateTotalAmount: function (item,index) {
            let checkbox = document.getElementById(`${index}`).checked
            if (checkbox) {
                this.totalPrice += this.calculateAmount(item)
            } else {
                this.totalPrice -= this.calculateAmount(item)
            }
        },
        toggleCheckbox: function () {
            let checkall = document.getElementById('checkall').checked // Ture/False
            let sum = 0
            for (let i = 0; i < this.items.length; i++) {
                let checkbox = document.getElementById(`${i}`) // It depends on the length of the array
                checkbox.checked = checkall
                if (checkall) {
                    sum += this.calculateAmount(this.items[i])
                } else {
                    sum = 0
                }
            }
            this.totalPrice = sum
        }
    }
})

// This Vue instance represents the shopping cart application.
// It is responsible for managing the cart state and provides a method to update the cart count.
// The updateCart method is called to increment the cart count when an item is added to the cart.
// The Vue instance is associated with an element in the HTML with the id "cart".

var cart = new Vue({
    el: '#cart',
    data:{
        cart: 0
    },
    methods:{
        updateCart: function (){
            this.cart ++
        }
    }
})

