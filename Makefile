build:
	git commit --allow-empty -m"Trigger Jekyll rebuild"
	git push

clean:
	rm -rf _site/

deploy:
	rsync -avz --delete _site/ timbl:/export/www/software-pre/html/
