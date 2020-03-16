rebuild_jekyll:
	git commit --allow-empty -m"Trigger Jekyll rebuild"
	git push

clean:
	rm -rf _site/

build:
	bundle exec jekyll build

deploy: clean build
	chmod -R ugo+rX _site/
	rsync -avz --delete _site/ typhon:/export/www/software-pre/html/

test:
	flake8
	black --check .
