from marshmallow import Schema, fields

class BreedSummary(Schema):
    name = fields.Str()
    group = fields.Str()

class Breed(BreedSummary):
    weight_pounds = fields.List(fields.Float())
    height_inches = fields.List(fields.Float())
    life_expectency = fields.List(fields.Integer())
    other_names = fields.List(fields.Str())
