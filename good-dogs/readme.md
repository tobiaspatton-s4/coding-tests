# The Good Dogs Coding Test

## The Challenge

Given a server that returns a list of dog breeds and details for each breed, write a single-page HTML client that:

1. Shows a list of all dogs breeds. (There's no requirement to implement paging, filtering, or sorting.)
2. When a breed in the list is selected by the user, show the details for that breed

Please create the client in either Angular or ReactJS. The choice of languages, frameworks, and other dependencies is up to you.

## Pre-requisites

You will need to have Docker intalled. We've tested with Docker 19, but any recent version should work.

You'll need the pre-requisites for your UI framework of choice. The framework is up to you, so we can't provide guidance on pre-requisites.

## Server API

The server is very simple and offers a GET endpoint at `/dogs`. The endpoint returns JSON data.

When no arguments are passed to the endpoint, the server returns a list of dogs and their breed group:
```
{
    group: String
    name: String
}
```

e.g.
```
[
    {
        "group": "herding",
        "name": "Australian Shepherd"
    },
    {
        "group": "herding",
        "name": "Australian Cattle Dog"
    },
    {
        "group": "herding",
        "name": "Border Collie"
    }
]
```

When the name of a dog is specified, e.g. `/dogs/border%20collie`, the details for that breed are returned:
```
{
    name: String
    weight: List<String>(2)
    group: String
    other_names: List<String>()
    height_inches: List<Float>(2)
    weight_pounts: List<Float>(2)
    life_expectancy: List<Integer>(2)
}
```

NB: Where a list of two numerical values is specified, the values are to be taken as a range, e.g. low to high.

e.g.
```
{
    "name": "Border Collie",
    "weight_pounds": [
        30.0,
        55.0
    ],
    "group": "herding",
    "other_names": null,
    "height_inches": [
        18.0,
        22.0
    ],
    "life_expectency": [
        12,
        15
    ]
}
```

## Running the Server

The server is built in Python, but can be run in a Docker container.

`cd server`

`docker build -t good-dogs .`

`docker run -p 8000:8000 good-dogs`

This should output something like

```
[2020-06-26 19:06:32 +0000] [6] [INFO] Starting gunicorn 20.0.4
[2020-06-26 19:06:32 +0000] [6] [INFO] Listening at: http://0.0.0.0:8000 (6)
[2020-06-26 19:06:32 +0000] [6] [INFO] Using worker: sync
[2020-06-26 19:06:32 +0000] [8] [INFO] Booting worker with pid: 8
```

Once the Docker container is running, you should be able to use the API, eg:

```
> curl http://localhost:8000/dogs/border%20collie
> {"other_names": null, "name": "Border Collie", "weight_pounds": [30.0, 55.0], "group": "herding", "life_expectency": [12, 15], "height_inches": [18.0, 22.0]}
```

## The Deliverables

Put your client code in the `/ui` directory, along with a `readme.md` file that tells us how to:

- build the client
- test the client
- run the client
- anything else that seems necessary

Try to make things as easy for us as possible. The best scenario is that we can build and run your appliction with a couple commands.

## How We'll Evaluate your Code

The goal of this exercise is to evaluate how you write production-quality code that implements a real world (-ish) requirement. With that in mind, we'll evaluate your code on these parameters:

- does it meet the functional requirements
- does it meet the software engineering goals of readability, maintainability, and reliability
- does it exhibit good visual and interaction design. 
    - Don't go nuts on the visual design! We don't expect our developers to be UI designers. 
    - The goal is a  visually pleasing layout using default styling, or a third-party styles library
- does it leverage the features of the UI framework
- does it use the programming languages in safe and effective ways

## Finally

Remember that they're all good dogs.
