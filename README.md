# A Simple Generator Application

## Installation

Install globally
```shell
npm install -g softgen
```

Installed CLI application is accessible through `gen` or `softgen` commands 

## Help

To see available generators check help

```shell
gen help
```

help command can be used for more advanced options for each generator
```shell
gen <generator> help
```

Eg:
```shell
gen uuid help
```
Will print more details and options for that generator

# Generators

## UUID

```shell
gen uuid # generates an uuid
```
By default generated uuid is copied to clipboard

### To disable copying to clipboard
```shell
gen uuid --no-copy
```

### Generate n number of ids

```shell
gen uuid 10
```

## Random string generator

```shell
gen random #generates a random string
```

default length is 40

### To disable copying to clipboard
```shell
gen random --no-copy
```

### Generate n character length of 1 id

```shell
gen random n
```

### Generate n character length of x id

```shell
gen random n x
```
More generators are on the way..!

