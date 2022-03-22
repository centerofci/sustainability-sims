import { Scene, ShadowGenerator, Vector3 } from "@babylonjs/core"
import { get_mesh } from "../utils/get_mesh"



export const mesh_name_low_poly_house_2 = "low_poly_house_2"


export function create_house (scene: Scene, shadow_generator: ShadowGenerator, position: Vector3, name: string)
{
    const house = get_mesh(scene, mesh_name_low_poly_house_2, "house_" + name, {
        position,
        receive_shadows: true,
        shadow_generator,
        visibility: 1,
    })
}
