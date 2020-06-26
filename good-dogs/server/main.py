import yaml
from flask import Flask, abort

from schema import Breed, BreedSummary

app = Flask(__name__)

breeds_file = open("dog_breeds.yaml", "r", encoding="utf-8")
breeds = yaml.load(breeds_file, Loader=yaml.Loader)

@app.route("/dogs")
def list_dogs():
    return BreedSummary().dumps(breeds, many=True)

@app.route("/dogs/<name>")
def dog(name):
    name = name.lower()
    dog = next((b for b in breeds if b["name"].lower() == name), None)
    if not dog:
        abort(404)
    return Breed().dumps(dog)
    
