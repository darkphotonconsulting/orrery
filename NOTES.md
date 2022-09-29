# 📝 Project Notes

## To Do

- incorprate AU calculation into `CelestialObjects`
  - benefit: using AUs may simplify scaling and make the overall scene appearance more crisp

## Problems

- object scaling
  - when scaling various values take on NaN values or values too small to be interpreted by the rendering engine.
- scene scaling
  - certain aspects of scene scaling are not working
- theme
  - work on and resolve issues with MUI v5 theming for non three-fiber components.

## Findings

- `three-fiber` allows passing a **`userData`** property to 3d objects in a scene allowing for more dynamic orchestration. The value of this property is an object.
  - Currently, we are passing our raw planet object as the property
  - this caused issues because `three-fiber` **also** strips any non property attributes from the object, eg. functions, including getters and setters.
    - explicitly passing the object and overwriting its function params works.
    - calling toJson() may also work (verify)
