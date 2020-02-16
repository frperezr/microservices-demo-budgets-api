VERSION=$$(cat package.json | grep version | sed 's/"/ /g' | awk {'print $$3'})
USER=frperezr
SVC=microservices-demo-budgets-api

install i:
	@echo "[install] Installing dependencies..."
	@yarn

build b:
	@echo "[building] Building service..."
	@yarn build

run r:
	@echo "[running] Running service..."
	@yarn start

dev:
	@echo "[running] Running service in dev mode..."
	@yarn dev

docker d:
	@echo "[docker] Building image..."
	@docker build -t $(USER)/$(SVC):$(VERSION) .

push p: docker
	@echo "[docker] pushing $(USER)/$(SVC):$(VERSION)"
	@docker tag $(USER)/$(SVC):$(VERSION) $(USER)/$(SVC):$(VERSION)
	@docker push $(USER)/$(SVC):$(VERSION)

.PHONY: run docker docker-login push
