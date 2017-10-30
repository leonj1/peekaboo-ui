all: docker

npmbuild:
	npm run build

docker: npmbuild
	docker build -t peekaboo:0.1 .
	docker tag peekaboo:0.1 artprod.dev.bloomberg.com/bfs/peekaboo:0.1
	docker push artprod.dev.bloomberg.com/bfs/peekaboo:0.1

