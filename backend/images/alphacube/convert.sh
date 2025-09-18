#!/bin/bash

for file in `ls`
do
	filename=`echo $file | cut -d'.' -f1`
	convert $file $filename.gif
done

