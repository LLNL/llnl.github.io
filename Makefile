rebuild_jekyll:
	git commit --allow-empty -m"Trigger Jekyll rebuild"
	git push

clean:
	rm -rf _site/

build:
	bundle exec jekyll build

deploy:
	chmod -R ugo+rX _site/
	rsync -avz --delete _site/ timbl:/export/www/software-pre/html/
