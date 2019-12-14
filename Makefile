VERSION=$$(cat package.json | grep version | sed 's/"/ /g' | awk {'print $$3'})
USER=frperezr
SVC=noken-budgets-api

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
