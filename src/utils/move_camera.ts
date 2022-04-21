import { Animation, ArcRotateCamera, EasingFunction, IAnimationKey, Mesh, Scene, SineEase, Vector3 } from "@babylonjs/core"



const frames_per_second = 24
const total_frames = 1 * frames_per_second

export function retarget_and_move_camera (scene: Scene, camera: ArcRotateCamera, new_target: Vector3, new_position?: Vector3)
{
    const diff = new_target.subtract(camera.target)
    new_position = new_position || camera.position.add(diff)


    const animation_camera_target = new Animation(
        "animation_camera_target",
        "target",
        frames_per_second,
        Animation.ANIMATIONTYPE_VECTOR3,
        Animation.ANIMATIONLOOPMODE_CYCLE
    )

    const animation_camera_position = new Animation(
        "animation_camera_position",
        "position",
        frames_per_second,
        Animation.ANIMATIONTYPE_VECTOR3,
        Animation.ANIMATIONLOOPMODE_CYCLE
    )


    const animation_keys_camera_target: IAnimationKey[] = [
        { frame: 0, value: camera.target.clone() },
        { frame: total_frames, value: new_target },
    ]

    const animation_keys_camera_position: IAnimationKey[] = [
        { frame: 0, value: camera.position.clone() },
        { frame: total_frames, value: new_position },
    ]


    animation_camera_target.setKeys(animation_keys_camera_target)
    animation_camera_position.setKeys(animation_keys_camera_position)


    const ease_position = new SineEase()
    ease_position.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT)
    animation_camera_target.setEasingFunction(ease_position)
    animation_camera_position.setEasingFunction(ease_position)


    scene.beginDirectAnimation(camera, [
        animation_camera_target,
        animation_camera_position,
    ], 0, total_frames, false)
}



export function retarget_and_move_camera_to_include_mesh (scene: Scene, camera: ArcRotateCamera, mesh: Mesh)
{
    const field_of_view_angle = camera.fov
    const mesh_sphere = mesh.getBoundingInfo().boundingSphere
    const size = mesh_sphere.radiusWorld
    const distance = (size/2) / Math.tan(field_of_view_angle/2)

    let new_position = camera.position.subtract(camera.target)
    new_position = new_position.normalize().scale(distance)
    new_position.addInPlace(mesh_sphere.centerWorld)

    retarget_and_move_camera(scene, camera, mesh_sphere.centerWorld, new_position)
}
