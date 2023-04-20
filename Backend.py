from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json
import sqlite3

app = Flask(__name__)
CORS(app)

#DB
urlDB = 'Database.db'
con = sqlite3.connect(urlDB , check_same_thread=False)
cursor = con.cursor()




#data
@app.route("/data/signup", methods=['POST'])
def datasignup():
     formdata = request.get_json()
     name = formdata['name']
     username = formdata['username']
     password = formdata['password']
     email = formdata['email']
     phoneNumber = formdata['phoneNumber']
     city = formdata['city']
     address = formdata['address']
     nationalCode = formdata['nationalCode']
     time = formdata['time']

     cursor.execute(f"INSERT INTO Customers VALUES (null , '{username}' ,'{name}','{password}','{email}','{phoneNumber}','{city}','{address}','{nationalCode}','{time}')" , )
     con.commit()

     return formdata

@app.route("/data/signup/username", methods=['POST'])
def datausername():
     formdata = request.get_json()
     username = formdata['username']
     cursor.execute(f"SELECT * from Customers WHERE username = '{username}'")
     rows = cursor.fetchall()

     data = []
     for row in rows:
      data.append({'id': row[0],'username': row[1]})
     return jsonify({'data': data})

@app.route("/data/login", methods=['POST'])
def datalogin():
     formdata = request.get_json()
     name = formdata['name']
     password = formdata['password']
     print(formdata)
     cursor.execute(f"SELECT * from Customers WHERE username = '{name}' and password = '{password}'")
     rows = cursor.fetchall()

     data = []
     for row in rows:
      data.append({'id': row[0], 'name': row[1],'email': row[2], 'password': row[3] , 'time': row[4]})
     return jsonify({'data': data})


@app.route('/data/user', methods=['POST'])
def dataUser():
     formdata = request.get_json()
     userId = formdata['id']
     print(formdata)
     cursor.execute(f"SELECT * from Customers WHERE customer_id = '{userId}'")
     rows = cursor.fetchall()

     data = []
     for row in rows:
      data.append({'id': row[0], 'username': row[1],'name': row[2],'password': row[3], 'email': row[4] , 'phoneNumber': row[5] , 'city': row[6] , 'address': row[7] , 'nationalCode': row[8] , 'time': row[9]})
     return jsonify({'data': data})


@app.route('/updata/user', methods=['POST'])
def updataUser():
     formdata = request.get_json()
     userId = formdata['id']
     username = formdata['username']
     name = formdata['name']
     password = formdata['password']
     email = formdata['email']
     phoneNumber = formdata['phoneNumber']
     city = formdata['city']
     address = formdata['address']
     nationalCode = formdata['nationalCode']

     print(formdata)
     cursor.execute(f"UPDATE Customers  SET username = '{username}' , name_lastname = '{name}' , password = {password} , email = '{email}' , phone_number = '{phoneNumber}' , city = '{city}' , address = '{address}' , national_code = '{nationalCode}'   WHERE customer_id = {userId}")
     con.commit()

     return formdata 

@app.route('/data/products', methods=['GET'])
def dataProducts():
    cursor.execute('SELECT * FROM Products')
    rows = cursor.fetchall()

    data = []
    for row in rows:
        data.append({'productId': row[0], 'productName': row[1], 'discraption': row[2], 'price': row[3], 'image': row[4], 'categoryId': row[5]})

    return jsonify({'data': data})
    

@app.route('/data/addcart', methods=['Post'])
def dataaddCart():
     formdata = request.get_json()
     userId = formdata['id']
     productId = formdata['productId']
     quantity = formdata['quantity']
     status = formdata['status']

     print(formdata)
     cursor.execute(f"INSERT INTO Cart VALUES ('{userId}' , '{productId}','{quantity}','{status}')" )
     con.commit()

     return formdata 

@app.route('/updata/sentcart', methods=['POST'])
def dataSentCart():
     formdata = request.get_json()
     userId = formdata['id']
     productId = formdata['productId']
     quantity = formdata['quantity']
     status = formdata['status']

     print(formdata)
     cursor.execute(f"UPDATE Cart SET status = '{status}' , quantity = '{quantity}' WHERE product_id = '{productId}' and customer_id = '{userId}'")
     con.commit()

     return formdata

@app.route('/data/deletecart', methods=['DELETE'])
def datadeleteCart():
     formdata = request.get_json()
     userId = formdata['id']
     productId = formdata['productId']

     print(formdata)
     cursor.execute(f"DELETE FROM Cart WHERE customer_id = {userId} and product_id = {productId}" )
     con.commit()
     
     return formdata 

@app.route('/data/cart', methods=['POST'])
def dataCart():
     formdata = request.get_json()
     userId = formdata['id']

     cursor.execute(f"SELECT * from Cart WHERE customer_id = '{userId}' ORDER BY product_id")
     rows = cursor.fetchall()

     data = []
     for row in rows:
      data.append({'customerId': row[0], 'productId': row[1],'quantity': row[2],'status': row[3]})
     return jsonify({'data': data})

@app.route('/data/orders', methods=['POST'])
def dataOrder():
     formdata = request.get_json()

     userId = formdata['id']
     time = formdata['time']
     totalAmount = formdata['totalAmount']
     paymentType = formdata['paymentType']
     status = formdata['status']

     productId = formdata['productId']
     quantity = formdata['quantity']
     itemNotes = formdata['itemNotes']
     itemPrice = formdata['itemPrice']
     itemDiscount = formdata['itemDiscount']
     itemTotal = formdata['itemTotal'] 
     itemStatus = formdata['itemStatus']

     print(formdata)
     cursor.execute(f"INSERT INTO Orders VALUES (null, {userId}  , '{time}', '{totalAmount}' ,'{paymentType}', '{status}')")

     cursor.execute(f"INSERT INTO OrderDetails VALUES (null , '{productId}','{quantity}','{itemNotes}','{itemPrice}','{itemDiscount}','{itemTotal}','{itemStatus}')")
     
     con.commit()
     return formdata 

@app.route('/data/customers', methods=['GET'])
def dataCustomers():
    cursor.execute('SELECT * FROM Customers')
    rows = cursor.fetchall()

    data = []
    for row in rows:
      data.append({'id': row[0], 'username': row[1],'name': row[2],'password': row[3], 'email': row[4] , 'phoneNumber': row[5] , 'city': row[6] , 'address': row[7] , 'nationalCode': row[8] , 'time': row[9]})

    return jsonify({'data': data})


@app.route('/data/deletecustomer', methods=['DELETE'])
def dataDeleteCustomer():
     formdata = request.get_json()

     userId = formdata['id']

     cursor.execute(f"DELETE FROM Customers WHERE customer_id = {userId}")
     
     con.commit()

     return formdata 


@app.route('/data/updatacustomer', methods=['POST'])
def dataUpdataCustomer():
     formdata = request.get_json()

     userId = formdata['id']
     username = formdata['username']
     name = formdata['name']
     password = formdata['password']
     email = formdata['email']
     phoneNumber = formdata['phoneNumber']
     city = formdata['city']
     address = formdata['address']
     nationalCode = formdata['nationalCode']
     time = formdata['time']
     
     cursor.execute(f"UPDATE Customers SET username = '{username}' , name_lastname = '{name}', password = {password} , email = '{email}', phone_number = '{phoneNumber}' , city = '{city}', address = '{address}' , national_code = '{nationalCode}', registration_time ='{time}' WHERE customer_id = {userId}")
     
     con.commit()

     return formdata 

@app.route('/data/categoryname', methods=['GET'])
def dataCategoryname():
    cursor.execute('SELECT * FROM Categories')
    rows = cursor.fetchall()

    data = []
    for row in rows:
      data.append({'id': row[0], 'name': row[1], 'description': row[2],'image': row[3]})

    return jsonify({'data': data})


@app.route("/data/addproduct", methods=['POST'])
def dataAddProducts():
     formdata = request.get_json()
     name = formdata['name']
     description = formdata['description']
     price = formdata['price']
     image = formdata['image']
     categoryId = formdata['categoryId']

     cursor.execute(f"INSERT INTO Products VALUES (null ,'{name}', '{description}', {price} ,'{image}', {categoryId} )")
     con.commit()

     return formdata


@app.route('/data/deleteproduct', methods=['DELETE'])
def dataDeleteProducts():
     formdata = request.get_json()

     productId = formdata['id']

     cursor.execute(f"DELETE FROM Products WHERE product_id = {productId}")
     
     con.commit()

     return formdata 

@app.route('/data/updataproduct', methods=['POST'])
def dataUpdataProduct():
     formdata = request.get_json()

     productId = formdata['id']
     name = formdata['name']
     description = formdata['description']
     price = formdata['price']
     image = formdata['image']
     categoryId = formdata['categoryId']

     cursor.execute(f"UPDATE Products SET  product_name = '{name}', description = '{description}', price ={price} , image = '{image}', category_id = {categoryId} WHERE product_id = {productId}")
     con.commit()

     return formdata

@app.route("/data/addcategories", methods=['POST'])
def dataAddCategories():
     formdata = request.get_json()
     name = formdata['name']
     img = formdata['img']
     description = formdata['description']

     cursor.execute(f"INSERT INTO Categories VALUES (null ,'{name}','{description}','{img}')")
     con.commit()

     return formdata


@app.route('/data/deletecategories', methods=['DELETE'])
def dataDeleteCategories():
     formdata = request.get_json()

     categoriesId = formdata['id']

     cursor.execute(f"DELETE FROM Categories WHERE categories_id = {categoriesId}")
     
     con.commit()

     return formdata 

@app.route('/data/updatacategories', methods=['POST'])
def dataUpdataCategories():
     formdata = request.get_json()

     categoriesId = formdata['id']
     name = formdata['name']


     cursor.execute(f"UPDATE Categories SET  Categories_name = '{name}' WHERE categories_id = {categoriesId}")
     con.commit()

     return formdata

@app.route("/data/addorders", methods=['POST'])
def dataAddOrders():
     formdata = request.get_json()
     customerId = formdata['customerId']  
     orderData = formdata['orderData']
     productId = formdata['productId']
     quantity = formdata['quantity']
     itemNotes = formdata['itemNotes']
     itemPrice = formdata['itemPrice']
     itemDiscount = formdata['itemDiscount']
     totalAmount = formdata['totalAmount']
     itemTotal = formdata['itemTotal']
     itemStatus = formdata['itemStatus']
     paymentType = formdata['paymentType']
     statuss = formdata['statuss']


     cursor.execute(f"INSERT INTO Orders VALUES (null ,'{customerId}','{orderData}','{totalAmount}','{paymentType}','{statuss}')")
     
     cursor.execute(f"INSERT INTO OrderDetails VALUES (null ,'{productId}','{quantity}','{itemNotes}','{itemPrice}','{itemDiscount}','{itemTotal}','{itemStatus}')")
     con.commit()

     return formdata

@app.route('/data/ordersa', methods=['GET'])
def dataOrdersa():
    cursor.execute('SELECT * FROM Orders INNER JOIN OrderDetails ON OrderDetails.order_id = Orders.order_id')
    rows = cursor.fetchall()

    data = []
    for row in rows:
      data.append({'order_id': row[0], 'customer_id': row[1], 'order_data': row[2], 'total_amount': row[3] , 'payment_type': row[4],'status': row[5],'product_id': row[7], 'quantity': row[8], 'item_notes': row[9] , 'item_price': row[10],'item_discount': row[11], 'item_total': row[12] , 'item_status': row[13]})

    return jsonify({'data': data})

@app.route('/data/deleteorders', methods=['DELETE'])
def dataDeleteOrders():
     formdata = request.get_json()

     orderId = formdata['id']

     cursor.execute(f"DELETE FROM Orders WHERE order_id = {orderId}")

     cursor.execute(f"DELETE FROM OrderDetails WHERE order_id = {orderId}")
     con.commit()

     return formdata 


@app.route('/data/updataorders', methods=['POST'])
def dataUpdataOrders():
     formdata = request.get_json()

     orderId = formdata['id']
     customerId = formdata['customerId']  
     orderData = formdata['orderData']
     productId = formdata['productId']
     quantity = formdata['quantity']
     itemNotes = formdata['itemNotes']
     itemPrice = formdata['itemPrice']
     itemDiscount = formdata['itemDiscount']
     totalAmount = formdata['totalAmount']
     itemTotal = formdata['itemTotal']
     itemStatus = formdata['itemStatus']
     paymentType = formdata['paymentType']
     statuss = formdata['statuss']

     cursor.execute(f"UPDATE Orders SET customer_id = '{customerId}', order_data = '{orderData}' , total_amount = '{totalAmount}' , payment_type = '{paymentType}' , status = '{statuss}' WHERE order_id = '{orderId}'")

     cursor.execute(f"UPDATE OrderDetails SET  product_id = '{productId}' , quantity = '{quantity}', item_notes = '{itemNotes}' , item_price = '{itemPrice}', item_discount = '{itemDiscount}' , item_total = '{itemTotal}' , item_status = '{itemStatus}'  WHERE order_id = '{orderId}'")
     
     con.commit()

     return formdata

@app.route('/data/sentorders', methods=['POST'])
def dataSentOrders():
     formdata = request.get_json()
     orderId = formdata['id']
     status = formdata['statuss']  


     cursor.execute(f"UPDATE Orders SET status = '{status}' WHERE order_id = {orderId}")

     con.commit()

     return formdata

@app.route("/data/addadmin", methods=['POST'])
def dataAddAdmin():
     formdata = request.get_json()
     name = formdata['name']
     username = formdata['username']
     password = formdata['password']

     cursor.execute(f"INSERT INTO Admin VALUES (null ,'{name}', '{username}', '{password}')")
     con.commit()

     return formdata

@app.route("/data/admin", methods=['POST'])
def dataAdmin():
     formdata = request.get_json()
     name = formdata['name']
     password = formdata['password']

     print(formdata)

     cursor.execute(f"SELECT * from Admin WHERE username = '{name}' and password = '{password}'" , )
     rows = cursor.fetchall()

     data = []
     for row in rows:
      data.append({'id':row[0] , 'name': row[2] , 'password': row[3]})
     return jsonify({'data': data})

@app.route('/data/infoadmin', methods=['GET'])
def datainfoadmin():
    cursor.execute('SELECT * FROM Admin')
    rows = cursor.fetchall()

    data = []
    for row in rows:
      data.append({'id': row[0], 'name': row[1], 'username': row[2],'password': row[3]})

    return jsonify({'data': data})

@app.route('/data/useradmin', methods=['POST'])
def datauseradmin():
    formdata = request.get_json()
    idAdmin = formdata['id']
    print(formdata)
    cursor.execute(f"SELECT * FROM Admin WHERE id = '{idAdmin}'")
    rows = cursor.fetchall()

    data = []
    for row in rows:
      data.append({'id': row[0], 'name': row[1], 'username': row[2],'password': row[3]})

    return jsonify({'data': data})

@app.route('/data/updataadmin', methods=['POST'])
def dataUpdataAdmin():
     formdata = request.get_json()

     adminId = formdata['id']
     name = formdata['name']
     username = formdata['username']
     password = formdata['password']

     cursor.execute(f"UPDATE Admin SET  name = '{name}', username = '{username}' , password = '{password}' WHERE id = {adminId}")
     con.commit()

     return formdata

@app.route('/data/deleteadmin', methods=['DELETE'])
def dataDeleteAdmin():
     formdata = request.get_json()

     adminId = formdata['id']

     cursor.execute(f"DELETE FROM Admin WHERE id = {adminId}")
     con.commit()

     return formdata


@app.route('/data/manager', methods=['GET'])
def datamanager():
    cursor.execute('SELECT * FROM Manager')
    rows = cursor.fetchall()

    data = []
    for row in rows:
      data.append({'name': row[0], 'username': row[1],'password': row[2]})

    return jsonify({'data': data})


@app.route('/data/updatamanager', methods=['POST'])
def dataUpdataManager():
     formdata = request.get_json()

     name = formdata['name']
     username = formdata['username']
     password = formdata['password']

     cursor.execute(f"UPDATE Manager SET  name = '{name}', username = '{username}' , password = '{password}'")
     con.commit()

     return formdata

@app.route("/data/loginmanager", methods=['POST'])
def loginManager():
     formdata = request.get_json()
     name = formdata['name']
     password = formdata['password']

     print(formdata)

     cursor.execute(f"SELECT * from Manager WHERE username = '{name}' and password = '{password}'", )
     rows = cursor.fetchall()

     data = []
     for row in rows:
      data.append({'name': row[0] , 'username': row[1] , 'password': row[2]})
     return jsonify({'data': data})

#port
if __name__ == "__main__":
     app.run()
app.run(host='0.0.0.0', port=5000)


