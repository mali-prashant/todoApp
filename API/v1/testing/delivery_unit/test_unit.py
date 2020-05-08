import requests
import json

url = "http://pmo-demo.herokuapp.com/api/delivery_unit/"

# payload = "{\n    \"key1\": 1,\n    \"key2\": \"value2\"\n}"

with open('delivery_unit.json', 'r') as f:
    delivery_unit = json.load(f)

# print(delivery_unit['add'])

headers = {
    'Content-Type': "application/json,text/plain"
}

def get_delivery_unit_data(url, id=None):
    print(url+ '{}/'.format(id))
    if id is None:
        return requests.get(url)
    else:
        return requests.get(url+ '{}'.format(id))
def add_unit(url, delivery_unit, headers):
    return requests.post(url, data=delivery_unit, headers=headers)

def update_unit_data(url, delivery_unit, headers, id):
    return requests.put(url+'{}'.format(id), data=delivery_unit, headers=headers)

def remove_unit_data(url,id, headers):
    return requests.delete(url + '{}'.format(id))

def test_unit_data_created():
    data = delivery_unit['add']
    print(data)
    response = add_unit(url, json.dumps(data), headers)
    assert response.status_code in (201, 200)

def test_get_delivery_unit_all_data():
    response = get_delivery_unit_data(url)
    assert response.status_code == 200

def test_get_delivery_unit_data_by_id():
    response = get_delivery_unit_data(url, 42)
    assert response.status_code == 200

def test_update_unit_data():
    data = delivery_unit['update']
    print(data)
    response = update_unit_data(url, json.dumps(data), headers, 42)
    print(response.status_code, "......")
    assert response.status_code == 204

def test_delete_remove_data():
    response = remove_unit_data(url, 42, headers)
    print(response.status_code)
    assert response.status_code == 204


# response = get_delivery_unit_data(url, 42)
# print(response.json())


# data = delivery_unit['add']
# response = add_unit(url, json.dumps(data), headers)
# print(response.json())
# print(response.status_code)

# response = requests.get(url)

# data = response.json()
#
# for i in data:
#     print(i)


# print(response.text)
