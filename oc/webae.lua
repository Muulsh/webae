local internet = require("internet")
local component = require("component")
local json = require('json')
local ae = component.me_controller
print("Running...")
while (true) do
	local encoded = json.encode(ae.getItemsInNetwork())
    texttosend = "items="..encoded 
	local handle = internet.request("http://shokokuki.ga/webae/send.php",texttosend) -- replace with your server
	os.sleep(30)
end