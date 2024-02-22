from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL

# configuracion
app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'mysql_docker'

mysql = MySQL(app)

CORS(app)

# rutas comuna
@app.route('/comuna/test', methods=['GET'])
def get_comunas_test():
    cur = mysql.connection.cursor()
    cur.execute('SELECT c.id, c.name FROM tbl_comuna c JOIN tbl_region r ON c.region_id = r.id WHERE r.name LIKE "%m%"')
    comunas = cur.fetchall()
    cur.close()
    return jsonify(comunas)


@app.route('/comuna', methods=['GET'])
def get_comunas():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM tbl_comuna')
    comunas = cur.fetchall()
    cur.close()
    return jsonify(comunas)


@app.route('/comuna/<int:id>', methods=['GET'])
def get_comuna(id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM tbl_comuna WHERE id = %s', (id,))
    comuna = cur.fetchone()
    cur.close()
    return jsonify(comuna)


@app.route('/comuna', methods=['POST'])
def add_comuna():
    data = request.get_json()
    name = data['name']
    code = data['code']
    active = data['active']
    region_id = data['region_id']

    cur = mysql.connection.cursor()
    cur.execute('INSERT INTO tbl_comuna (name, code, active, region_id) VALUES(%s, %s, %s, %s)', (name, code, active, region_id))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Comuna added successfully'})


@app.route('/comuna/<int:id>', methods=['PUT'])
def update_comuna(id):
    data = request.get_json()
    name = data['name']
    code = data['code']
    active = data['active']
    region_id = data['region_id']

    cur = mysql.connection.cursor()
    cur.execute('UPDATE tbl_comuna SET name=%s, code=%s, active=%s, region_id=%s WHERE id=%s', (name, code, active, region_id, id))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Comuna updated successfully'})


@app.route('/comuna/<int:id>', methods=['DELETE'])
def delete_comuna(id):
    cur = mysql.connection.cursor()
    cur.execute('DELETE FROM tbl_comuna WHERE id=%s', (id,))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Comuna deleted successfully'})


if __name__ == '__main__':
    app.run(debug=True)