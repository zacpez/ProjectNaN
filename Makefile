install: 
	npm install jsdoc socket.io -g

update:
	npm update -g

docs:
	jsdoc js/*.js server/*.js -d docs/