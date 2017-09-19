#!/bin/bash

#Modify these strings to have a different output on window
# MYERRORTXT=print on errors, 1 for every error instance
# MYOKTXT=print on success, only if all the writing are successful
# !!! \$TYPE will be substituted with D,A or I, depending on the variable type
# !!! \$INDEX will be substituted with the index of the variable
# !!! \$VALUE will be substituted with the value of the variable
MYERRORTXT="Error setting variable type \$TYPE index \$INDEX to value \$VALUE"
MYOKTXT="Operation completed succesfully"

ERRORTXT="echo \"$MYERRORTXT\n\""
OKTXT="echo \"$MYOKTXT\n\""

function pageTop() {
	echo ""
	echo "<html><body>"
	echo "Original query string = $QUERY_STRING<br>"
	echo "Substituted query string = $SQUERY_STRING<br>"
}

function pageBottom() {
	echo "</body></html>"
}

# Query has to be like this: "?var|D|1|1|var|A|100|500|I|207|12345"

if [ "$QUERY_STRING" != "" ]; then
	
  # Normalize the query, replacing encoding from the browser
  SQUERY_STRING=$(echo $QUERY_STRING | sed 's/\%7[c,C]/|/g')

	IFS="|"
	
  for i in $SQUERY_STRING; do
		if [ "$i" = "debug" ]; then
			DEBUG=1
			pageTop
			continue
		else
			DEBUG=0
		fi
	
		if [ "$i" = "var" ]; then
			START=1
			continue
		fi
	
		case $START in
		
			1) TYPE=$i
			START=2
			;;
		
			2) INDEX=$i
			START=3
			;;
		
			3) VALUE=$i
			if [ "$DEBUG" = "1" ]; then
				echo "pcoset 0 $TYPE $INDEX $VALUE<br>"
			fi
			RESULT=$(pcoset 0 $TYPE $INDEX $VALUE 2>&1)
			if [ "$RESULT" != "" ]; then
				OUTTXT="${OUTTXT}$(eval $ERRORTXT)"
			fi
			START=0
			;;
		esac
	
	done
	IFS=" "
	
else
	OUTTXT="No variables specified!"
fi
	
	if [ "$DEBUG" = "1" ]; then
		pageBottom
	else
		if [ "$OUTTXT" = "" ]; then
			OUTTXT=$(eval $OKTXT)
		fi
		echo -e "\n<html><head></head><body><pre>$OUTTXT</pre></body></html>"
	fi


if [ "$REQUEST_METHOD" = "POST" ]; then
	read QUERY_STRING
	REQUEST_METHOD=GET
	export REQUEST_METHOD
	export QUERY_STRING
fi

