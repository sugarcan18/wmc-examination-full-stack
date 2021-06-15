<template>
    <div class="contanier-fluid p-5">
        <div class="header">
            <h3>List Product</h3>
        </div>
        <div class="content pt-3">
            <div class="row">
                <div v-for="(item,index) in product"  :key="index" class="col-sm-12 col-md-2 col-lg-3 col-xl-3">
                    <div  class="card">
                        <div class="card-body text-center">
                            <h4>{{item.productName}}</h4>
                            <h5>ราคา {{item.price}} บาท</h5>
                            <button class="btn btn-primary" @click="insertCart(item)" >เลือก</button>
                        </div>
                    </div>
                </div>
            </div>
           
        </div> 
        <hr v-if="order.length !== 0">
        <div class="content" v-if="order.length !== 0">
            <div class="header">
                <h3>Cart</h3>
            </div>
            <div class="row">
                <div v-for="(item,index) in order"  :key="index" class="col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-2">
                    <div class="card">
                        <div class="card-body">
                            {{item.productName}} <span>: ราคา {{item.price}} บาท</span> <span style="float:right">{{item.qty}}</span>
                        </div>
                    </div>
                </div>
                <div class="text-center pt-3">
                      <button class="btn btn-success px-3" @click="saveOrder()">ยืนยันรายการ</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
    data() {
        return {
            product: null,
            axios: null,
            order: []
        }
  },
   mounted() {
        this.axios = require('axios');
        this.getProduct()
    },
   methods: {
       getProduct(){
                this.axios.get('http://localhost:3000/product').then((response) => {
                    this.product = response.data.data
                    console.log(this.product)
                })
       },
       insertCart(product){
           if(this.order.length < 1){
                product.qty = 1
                this.order.push(product)
           }else{
            // this.order.forEach((element) => {
            //    if(element.productName == product.productName){
            //        element.qty =  element.qty+1
            //    }else{
            //        product.qty = 1
            //        this.order.push(product)
            //    }
            // })
             for(let i = 0; i <= this.order.length-1; i++){
                 if(this.order[i].productName === product.productName){
                    this.order[i].qty = this.order[i].qty+1
                    break;
                 }else{
                    let item = this.order.find(element => element.productName === product.productName);
                    if(item){
                        //
                    }else{
                        product.qty = 1
                        this.order.push(product)
                        break;
                    } 
                 }
             }
           }
       },
       saveOrder(){
                this.axios.post('http://localhost:3000/order' , {
                        body: this.order
                    }).then((response) => {
                    // this.product = response.data.data
                    console.log(response)
                })
       }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
