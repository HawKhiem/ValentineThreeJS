import React from 'react';
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { useCursor, MeshPortalMaterial, CameraControls, Gltf, Preload, Text } from '@react-three/drei'
import { Text as DreiText } from '@react-three/drei' // Rename to DreiText to avoid conflict
import { useRoute, useLocation } from 'wouter'
import { easing, geometry } from 'maath'
import { suspend } from 'suspend-react'

extend(geometry)
const regular = import('@pmndrs/assets/fonts/inter_regular.woff')
const medium = import('@pmndrs/assets/fonts/inter_medium.woff')
function Background1() {
  const { scene } = useThree()
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load('sky1.jpg', (texture) => {
      scene.background = texture
    })
  }, [scene])
  return null
}

function Background2() {
  const { scene } = useThree()
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load('sky2.jpg', (texture) => {
      scene.background = texture
    })
  }, [scene])
  return null
}


function BackgroundMusic({ url }) {
  const { camera } = useThree()
  const [audio, setAudio] = useState(null)

  useEffect(() => {
    const listener = new THREE.AudioListener()
    camera.add(listener)

    const sound = new THREE.Audio(listener)
    const audioLoader = new THREE.AudioLoader()

    audioLoader.load(url, (buffer) => {
      sound.setBuffer(buffer)
      sound.setLoop(true)
      sound.setVolume(0.05)
      setAudio(sound)

      // Attempt to play immediately
      const playAudio = () => {
        if (sound.context.state === 'suspended') {
          sound.context.resume().then(() => {
            sound.play()
          })
        } else {
          sound.play()
        }
      }

      // Try playing (most browsers block this)
      playAudio()

      // Add event listener for user interaction fallback
      const handleUserInteraction = () => {
        playAudio()
        window.removeEventListener('click', handleUserInteraction)
      }

      window.addEventListener('click', handleUserInteraction)
    })

    return () => {
      sound.stop()
      camera.remove(listener)
      window.removeEventListener('click', () => { })
    }
  }, [camera, url])

  return null
}


function InteractiveLetter() {
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    setIsOpen(!isOpen) // Toggle letter state on click
  }

  return (
    <group position={[100, 50, -50]}>
      {/* Letter button */}
      <mesh onClick={handleClick} position={[0, 0, 0]}>
        <DreiText font={suspend(medium).default} fontSize={3} color={isOpen ? 'green' : 'red'}>
          Click Me
        </DreiText>
      </mesh>

      {/* Conditional content */}
      {isOpen && (
        <>
          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -8, 0]} material-toneMapped={false}>
            Hallo Lân! Hôm nay Lân đã nhận được socola hay hoa chưa? Nếu chưa thì hãy để Khiêm tặng Lân nhé.
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -16, 0]} material-toneMapped={false}>
            Tôi mới bập bẹ học ThreeJS và React nên chắc là trông chưa đẹp lắm. Tôi có chuẩn bị cho Lân một ít
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -24, 0]} material-toneMapped={false}>
            bánh kem, hot chocolate và một bó hoa tươi. Bếp núc bừa quá, Lân thông cảm cho tôi nha. Tôi vẫn chưa
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -32, 0]} material-toneMapped={false}>
            biết vẽ models nên những chiếc bánh và bông hoa này là tôi đi mua. Hy vọng ngày nào đó tôi sẽ có cơ
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -40, 0]} material-toneMapped={false}>
            hội tặng Lân những bông hoa thật, những miếng bánh tôi tự làm. Dạo gần đây tôi bận quá, nên chưa kịp hồi
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -48, 0]} material-toneMapped={false}>
            âm cho Lân. Tôi đã nhận được thiệp của Lân và quả thực là tôi chưa bao giờ xúc động nhiều đến vậy.
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -56, 0]} material-toneMapped={false}>
            Tôi đã đọc đi đọc lại bức thư ấy 3 lần, đến giờ tôi vẫn suy nghĩ về những điều Lân nói. Tôi biết
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -64, 0]} material-toneMapped={false}>
            hồi đó Lân đã hé mở lòng, tôi đã chờ ngày đó rất lâu. Nhưng linh cảm mách bảo tôi rằng, cánh cửa
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -72, 0]} material-toneMapped={false}>
            ấy mở cho một người khác và tôi chỉ tình cờ có mặt khi nó chưa kịp khép lại. Tôi sợ tôi sẽ đánh mất
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -80, 0]} material-toneMapped={false}>
            Lân cả trên danh nghĩa bạn bè, nếu như tôi cố chấp chen chân vào. Tôi không hối hận vì quyết định của mình.
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -88, 0]} material-toneMapped={false}>
            Tôi mới chỉ một là một đứa trẻ khi tôi nói tôi thích Lân. Nhưng giờ tôi là một người trưởng thành

          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -96, 0]} material-toneMapped={false}>
            chín chắn khi tôi nói tôi yêu Lân. Tôi yêu Lân nhiều, và tôi muốn Lân biết rằng, Lân không nợ tôi điều gì cả.
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -104, 0]} material-toneMapped={false}>
            Tôi biết sẽ rất khó để Lân chấp nhận điều đó. Nhưng tôi yêu Lân vô điều kiện, Lân xứng đáng được yêu,
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -112, 0]} material-toneMapped={false}>
            xứng đáng với mọi tình cảm tôi dành cho Lân.
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -120, 0]} material-toneMapped={false}>
            Lân đừng thấy áy náy nhé, tôi vẫn đang cố gắng từng ngày, vì Lân và vì bản thân tôi. Tôi đã trở nên tốt hơn
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -128, 0]} material-toneMapped={false}>
            rất nhiều kể từ khi tôi biết yêu Lân. Tôi đang học song song Bachelor và Master, cày dự án, luyện tập mỗi
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -136, 0]} material-toneMapped={false}>
            ngày và chăm chút cách ăn mặc, nói chuyện để một ngày đạt được ước mơ "viển vông" nhất của tôi - tự mình
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -144, 0]} material-toneMapped={false}>
            mở được cánh cửa vào trái tim Lân. Tôi còn nợ Lân một lời tỏ tình trực tiếp, điều mà trước giờ tôi vẫn chưa làm được.
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -152, 0]} material-toneMapped={false}>
            Nếu như tôi được may mắn lần này, hy vọng khi đó một Nguyễn Hữu Khiêm hoàn toàn khác sẽ đứng trước mặt Lân, bảy tỏ
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -160, 0]} material-toneMapped={false}>
            tình cảm của mình. Tôi không biết tương lai sẽ ra sao, nhưng tôi biết tôi yêu Lân, và tôi nhất định sẽ không để Lân phải đợi.
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -168, 0]} material-toneMapped={false}>
            Lân cũng không cần đợi tôi đâu. Nhưng nếu có ngày Lân quay đầu lại nhìn, Lân nhất định sẽ thấy tôi.
          </DreiText>

          <DreiText font={suspend(regular).default} fontSize={4} position={[0, -176, 0]} material-toneMapped={false}>
            Love you to the moon and back! Happy Valentine's day!
          </DreiText>
        </>
      )}
    </group>
  )
}

function Frame1({ id, name, author, bg, radius = 10, children, ...props }) {
  const portal = useRef()
  const [, setLocation] = useLocation()
  const [, params] = useRoute('/item/:id')
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  useFrame((state, dt) => easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt))

  // Handle navigation for double-click on frames
  const handleDoubleClick = (e) => {
    e.stopPropagation()
    setLocation(`/item/${id}`)
  }

  return (
    <group {...props}>
      <Text font={suspend(medium).default} fontSize={0.3} anchorY="top" anchorX="left" lineHeight={0.8} position={[-0.375, 0.715, 0.01]} material-toneMapped={false}>
        {name}
      </Text>
      <Text font={suspend(regular).default} fontSize={0.1} anchorX="right" position={[0.4, -0.659, 0.01]} material-toneMapped={false}>
        /{id}
      </Text>
      <Text font={suspend(regular).default} fontSize={0.04} anchorX="right" position={[0.0, -0.677, 0.01]} material-toneMapped={false}>
        {author}
      </Text>
      <Text font={suspend(regular).default} fontSize={1} anchorX="center" position={[0, -radius + 1, 0.01]} material-toneMapped={false}>
        Double Click Me!
      </Text>
      <mesh
        name={id}
        onDoubleClick={handleDoubleClick} // Use the new double-click handler
        onPointerOver={(e) => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <circleGeometry args={[radius, 64]} />
        <MeshPortalMaterial ref={portal} events={params?.id === id} side={THREE.DoubleSide}>
          <color attach="background" args={[bg]} />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  )
}


function Frame2({ id, name, author, bg, radius = 30, children, ...props }) {
  const portal = useRef()
  const [, setLocation] = useLocation()
  const [, params] = useRoute('/item/01/:id')
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  useFrame((state, dt) => easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt))

  // Handle navigation for double-click on frames
  const handleDoubleClick = (e) => {
    e.stopPropagation()
    if (id === '02') {
      setLocation('/item/01/02') // Navigate to /item/2 when double-clicking on Frame 2
    }
  }

  return (
    <group {...props}>
      <Text font={suspend(medium).default} fontSize={0.3} anchorY="top" anchorX="left" lineHeight={0.8} position={[-0.375, 0.715, 0.01]} material-toneMapped={false}>
        {name}
      </Text>
      <Text font={suspend(regular).default} fontSize={0.1} anchorX="right" position={[0.4, -0.659, 0.01]} material-toneMapped={false}>
        /{id}
      </Text>
      <Text font={suspend(regular).default} fontSize={0.04} anchorX="right" position={[0.0, -0.677, 0.01]} material-toneMapped={false}>
        {author}
      </Text>
      <Text font={suspend(regular).default} fontSize={3} anchorX="center" position={[0, -radius + 4, 0.01]} material-toneMapped={false}>
        Double Click Me!
      </Text>
      <mesh
        name={id}
        onDoubleClick={handleDoubleClick} // Use the new double-click handler
        onPointerOver={(e) => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <circleGeometry args={[radius, 64]} />
        <MeshPortalMaterial ref={portal} events={params?.id === id} side={THREE.DoubleSide}>
          <color attach="background" args={[bg]} />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  )
}

function Rig({ position = new THREE.Vector3(0, 0, 50), focus = new THREE.Vector3(0, 0, 0) }) {
  const { controls, scene } = useThree()
  const [, params] = useRoute('/item/:id')
  useEffect(() => {
    const active = scene.getObjectByName(params?.id)
    if (active) {
      active.parent.localToWorld(position.set(0, 0, 30)) // this is how far the camera is gonna be after going into the portal
      active.parent.localToWorld(focus.set(0, 0, -2))
    }
    if (controls) {
      controls.setLookAt(...position.toArray(), ...focus.toArray(), true);
    }
  })
  return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
}



export const App = () => (
  <Canvas flat camera={{ fov: 75, position: [0, 5, 150] }} eventSource={document.getElementById('root')} eventPrefix="client">
    <BackgroundMusic url="infinite.mp3" />
    <Background2 />
    <Frame1 id="01" bg="#e4cdac" position={[-22, 25, -2]}>
      <Background1 />
      <Gltf src="cozy_day.glb" scale={4} position={[0, -5, -2]} rotation={[0, -Math.PI / 2, 0]} />
      <Gltf src="flowers.glb" scale={8} position={[2, -1.8, 12]} rotation={[Math.PI / 3.5, -Math.PI / 4, 0]} />
      <Gltf src="choco.glb" scale={0.8} position={[-1, -1.8, 17.3]} />
      <Gltf src="cake.glb" scale={1.5} position={[2, -1.8, 17.3]} />
      <Gltf src="table.glb" scale={10} position={[0, -5, 15]} />
      <Frame2 id="02" position={[-60, 30, -50]}>
        {/* <Background3 /> */}
        <color attach="background" args={['#000000']} />
        <Gltf src="moon.glb" scale={0.02} position={[-40, 0, -50]} />
        <Gltf src="sun.glb" scale={10} position={[800, 50, -500]} />
        <InteractiveLetter position={[500, 30, -50]} />

      </Frame2>
    </Frame1>
    <Rig />
    <Preload all />
  </Canvas>
)