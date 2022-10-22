import React, { useEffect } from 'react'
import { useRef } from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


const Scene = () => {

    const mountRef = useRef(null)

    useEffect(() => {
        const currentMount = mountRef.current

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            25,
            currentMount.clientWidth / currentMount.clientHeight,
            0.1,
            1000
        )

        camera.position.z = 4

        scene.add(camera)
        console.log("")

        const renderer = new THREE.WebGL1Renderer()
        renderer.setSize(currentMount.clientWidth,
            currentMount.clientHeight)
        currentMount.appendChild(renderer.domElement)

        //Controls
        const controls = new OrbitControls(camera, renderer.domElement)
        // controls.target = new THREE.Vector3(3, 3, 3)
        controls.enableDamping = true

        const cube = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial()
        )
        scene.add(cube)
        cube.position.z = -5

        //Sphere
        const geometry = new THREE.SphereGeometry(0.8, 32, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        sphere.position.x = 2
        sphere.position.y = 2

        //TorusKnot
        const geometry1 = new THREE.TorusKnotGeometry(0.3, 0.1, 100, 16);
        const material1 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const torusKnot = new THREE.Mesh(geometry1, material1);
        scene.add(torusKnot);
        torusKnot.position.x = -2
        torusKnot.position.y = -0.5
        torusKnot.position.set(-2, -0.5, 0)
        torusKnot.scale.set(2, 2, 1)
        
        
        const animate = () => {
            controls.update()
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate()

        return () => {
            currentMount.removeChild(renderer.domElement)
        }
    }, [])

    return (
        <div
            className='Contenedor3D'
            ref={mountRef}
            style={{ width: '100%', height: '100vh' }}
        ></div>
    )
}

export default Scene