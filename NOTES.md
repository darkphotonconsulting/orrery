# 📝 Project Notes

## To Do

- blahblah
- 🇨🇬

## Problems

- scaling

## Findings

- `three-fiber` allows passing a **`userData`** property to 3d objects in a scene allowing for more dynamic orchestration. The value of this property is an object.
  - Currently, we are passing our raw planet object as the property
  - this caused issues because `three-fiber` **also** strips any non property attributes from the object, eg. functions, including getters and setters.
    - explicitly passing the object and overwriting its function params works.
    - calling toJson() may also work (verify)
