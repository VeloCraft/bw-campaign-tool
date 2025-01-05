#!/bin/bash

if [ $# -eq 0 ]
then
  echo "No component specified"
else
  COMPONENT_DIR=$(echo $1 | rev | cut -d'/' -f2- | rev)
  COMPONENT_FILE=$(echo $1 | rev | cut -d'/' -f1 | rev)

  if [ "$COMPONENT_DIR" = "$COMPONENT_FILE" ]
  then
    COMPONENT_DIR=""
  fi

  if [ -z "$COMPONENT_FILE" ]
  then
    echo "Component not found"
  else
    # Check if COMPONENT_DIR variable is empty
    if [ -z "$COMPONENT_DIR" ]
    then
      CFILE="components/$COMPONENT_FILE"
    else
      CFILE="components/$COMPONENT_DIR/$COMPONENT_FILE"
    fi
    COMPONENT="$PWD/$CFILE"
    if $( rm $COMPONENT.{js,ts,jsx,tsx} 2> /dev/null )
    then
      echo "✔  \033[0;31m--\033[0m /$CFILE"
    else
      echo "✔  \033[0;31m--\033[0m [SKIPPED] $COMPONENT (no exist)"
    fi
    if [ -z "$PWD/components/$COMPONENT_DIR" ]
    then
      rmdir --ignore-fail-on-non-empty $PWD/components/$COMPONENT_DIR 2> /dev/null
    fi

    if [ -z "$COMPONENT_DIR" ]
    then
      SFILE="stories/$COMPONENT_FILE.stories"
    else
      SFILE="stories/$COMPONENT_DIR/$COMPONENT_FILE.stories"
    fi
    STORY="$PWD/$SFILE"
    if $( rm $STORY.{js,ts,jsx,tsx} 2> /dev/null )
    then
      echo "✔  \033[0;31m--\033[0m /$SFILE"
    else
      echo "✔  \033[0;31m--\033[0m [SKIPPED] $STORY (no exist)"
    fi
    if [ -z "$PWD/components/$COMPONENT_DIR" ]
    then
      rmdir --ignore-fail-on-non-empty $PWD/stories/$COMPONENT_DIR 2> /dev/null
    fi

  fi
fi

exit 0
