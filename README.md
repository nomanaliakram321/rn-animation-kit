# React Native Animation Package 🎨

A powerful and easy-to-use animation library for React Native using `react-native-reanimated`. Animate your components with simple wrapper components.

## Features ✨

- 🎭 **Multiple Animation Types**: FadeIn, SlideIn, ScaleIn, RotateIn, BounceIn, FlipIn, ZoomIn
- 🔄 **Flexible Directions**: Animate from any direction (top, bottom, left, right, diagonals)
- ⚡ **Performance**: Built on react-native-reanimated for 60fps animations
- 🎯 **TypeScript**: Full TypeScript support with type definitions
- 🎪 **Composable**: Combine animations with Sequence and Parallel components
- 🎛️ **Customizable**: Control timing, delays, distances, and more
- 📱 **Cross-platform**: Works on iOS and Android

## Installation

```bash
npm install react-native-reanimated
# or
yarn add react-native-reanimated
```

Follow the [react-native-reanimated installation guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/) for additional setup.

## Usage

### Basic Example

```tsx
import { FadeIn, SlideIn, ScaleIn } from './animations';
import { View, Text } from 'react-native';

function App() {
  return (
    <View>
      <FadeIn direction="top" delay={0}>
        <Text>I fade in from the top!</Text>
      </FadeIn>

      <SlideIn direction="left" delay={100}>
        <Text>I slide in from the left!</Text>
      </SlideIn>

      <ScaleIn delay={200}>
        <Text>I scale up!</Text>
      </ScaleIn>
    </View>
  );
}
```

## Animation Components

### FadeIn

Fades in with optional directional movement and scaling.

```tsx
<FadeIn
  direction="top"        // 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  distance={75}          // Distance to travel (default: 75)
  scale={1.2}           // Initial scale (default: 1, no scale)
  delay={0}             // Delay before animation starts (ms)
  animate={true}        // Enable/disable animation
  onAnimationComplete={() => console.log('Done!')}
>
  <YourComponent />
</FadeIn>
```

**Examples:**

```tsx
// Fade in from top with slight scale
<FadeIn direction="top" scale={1.1}>
  <Text>Welcome!</Text>
</FadeIn>

// Fade in from bottom-left corner
<FadeIn direction="bottom-left" distance={100}>
  <Card />
</FadeIn>
```

### SlideIn

Slides in from specified direction.

```tsx
<SlideIn
  direction="left"      // 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  distance={300}        // Custom distance (optional, defaults to screen width)
  delay={0}
>
  <YourComponent />
</SlideIn>
```

**Examples:**

```tsx
// Slide in from right
<SlideIn direction="right">
  <Menu />
</SlideIn>

// Slide in from top with custom distance
<SlideIn direction="top" distance={200}>
  <Header />
</SlideIn>
```

### ScaleIn

Scales up from small to full size.

```tsx
<ScaleIn
  initialScale={0}      // Starting scale (default: 0)
  finalScale={1}        // Ending scale (default: 1)
  direction="bottom"    // Optional directional movement
  delay={0}
>
  <YourComponent />
</ScaleIn>
```

**Examples:**

```tsx
// Scale from 0 to 1
<ScaleIn>
  <Avatar />
</ScaleIn>

// Scale with upward movement
<ScaleIn initialScale={0.5} direction="bottom">
  <Button />
</ScaleIn>
```

### RotateIn

Rotates while fading in.

```tsx
<RotateIn
  rotation={360}        // Degrees to rotate (default: 360)
  direction="clockwise" // 'clockwise' | 'counter-clockwise'
  delay={0}
>
  <YourComponent />
</RotateIn>
```

**Examples:**

```tsx
// Full rotation clockwise
<RotateIn>
  <Icon name="settings" />
</RotateIn>

// Half rotation counter-clockwise
<RotateIn rotation={180} direction="counter-clockwise">
  <Logo />
</RotateIn>
```

### BounceIn

Bounces in with elastic effect.

```tsx
<BounceIn
  direction="bottom"    // 'top' | 'bottom' | 'left' | 'right'
  bounceHeight={100}    // Height of bounce (default: 100)
  delay={0}
>
  <YourComponent />
</BounceIn>
```

**Examples:**

```tsx
// Bounce from bottom
<BounceIn direction="bottom">
  <Notification />
</BounceIn>

// High bounce from top
<BounceIn direction="top" bounceHeight={150}>
  <Alert />
</BounceIn>
```

### FlipIn

Flips in on X or Y axis.

```tsx
<FlipIn
  axis="y"              // 'x' | 'y'
  direction="forward"   // 'forward' | 'backward'
  delay={0}
>
  <YourComponent />
</FlipIn>
```

**Examples:**

```tsx
// Flip on Y axis (horizontal flip)
<FlipIn axis="y">
  <Card />
</FlipIn>

// Flip on X axis (vertical flip)
<FlipIn axis="x" direction="backward">
  <Panel />
</FlipIn>
```

### ZoomIn

Zooms in with optional overshoot effect.

```tsx
<ZoomIn
  initialScale={0}      // Starting scale (default: 0)
  overshoot={1.1}       // Overshoot scale (default: 1.1)
  delay={0}
>
  <YourComponent />
</ZoomIn>
```

**Examples:**

```tsx
// Zoom with slight overshoot
<ZoomIn>
  <Modal />
</ZoomIn>

// Zoom from 0.5 with large overshoot
<ZoomIn initialScale={0.5} overshoot={1.2}>
  <Popup />
</ZoomIn>
```

## Composition Components

### Sequence

Animates children one after another with staggered timing.

```tsx
<Sequence stagger={100} delay={0}>
  <FadeIn direction="top">
    <Text>First</Text>
  </FadeIn>
  <FadeIn direction="top">
    <Text>Second (100ms later)</Text>
  </FadeIn>
  <FadeIn direction="top">
    <Text>Third (200ms later)</Text>
  </FadeIn>
</Sequence>
```

**Example - List Items:**

```tsx
<Sequence stagger={75}>
  {items.map((item, index) => (
    <FadeIn key={index} direction="left">
      <ListItem data={item} />
    </FadeIn>
  ))}
</Sequence>
```

### Parallel

Animates all children simultaneously.

```tsx
<Parallel delay={200}>
  <FadeIn direction="top">
    <Header />
  </FadeIn>
  <SlideIn direction="left">
    <Sidebar />
  </SlideIn>
  <ScaleIn>
    <Content />
  </ScaleIn>
</Parallel>
```

## Real-World Examples

### Card List with Stagger

```tsx
function CardList({ cards }) {
  return (
    <Sequence stagger={100}>
      {cards.map((card, index) => (
        <FadeIn key={card.id} direction="top" distance={50}>
          <Card data={card} />
        </FadeIn>
      ))}
    </Sequence>
  );
}
```

### Modal with Multiple Animations

```tsx
function AnimatedModal({ visible }) {
  return (
    <ZoomIn animate={visible} initialScale={0.8}>
      <View style={styles.modal}>
        <Sequence stagger={50}>
          <FadeIn direction="top">
            <ModalHeader />
          </FadeIn>
          <FadeIn direction="left">
            <ModalContent />
          </FadeIn>
          <FadeIn direction="bottom">
            <ModalActions />
          </FadeIn>
        </Sequence>
      </View>
    </ZoomIn>
  );
}
```

### Hero Section

```tsx
function HeroSection() {
  return (
    <View>
      <FadeIn direction="top" distance={100}>
        <Logo />
      </FadeIn>
      
      <Sequence stagger={150} delay={200}>
        <FadeIn direction="left">
          <Title>Welcome to Our App</Title>
        </FadeIn>
        <FadeIn direction="right">
          <Subtitle>Build amazing things</Subtitle>
        </FadeIn>
        <ScaleIn>
          <Button title="Get Started" />
        </ScaleIn>
      </Sequence>
    </View>
  );
}
```

### Tab Navigation

```tsx
function TabContent({ activeTab }) {
  return (
    <>
      {activeTab === 'home' && (
        <SlideIn direction="right">
          <HomeContent />
        </SlideIn>
      )}
      {activeTab === 'profile' && (
        <SlideIn direction="left">
          <ProfileContent />
        </SlideIn>
      )}
    </>
  );
}
```

### Notification Toast

```tsx
function Toast({ visible, message }) {
  return (
    <BounceIn 
      animate={visible} 
      direction="top" 
      bounceHeight={80}
      onAnimationComplete={() => console.log('Toast shown')}
    >
      <View style={styles.toast}>
        <Text>{message}</Text>
      </View>
    </BounceIn>
  );
}
```

## Configuration

### Spring Configs

Pre-configured spring animations:

```tsx
import { SPRING_CONFIGS } from './animations/config';

// Available configs:
SPRING_CONFIGS.default  // Balanced (damping: 14, stiffness: 75)
SPRING_CONFIGS.gentle   // Smooth (damping: 20, stiffness: 90)
SPRING_CONFIGS.bouncy   // Elastic (damping: 8, stiffness: 100)
SPRING_CONFIGS.stiff    // Quick (damping: 26, stiffness: 180)
SPRING_CONFIGS.slow     // Gradual (damping: 20, stiffness: 50)
```

### Custom Animations

You can customize the spring configuration in each component:

```tsx
// Modify in the component files
const SPRING_CONFIG = {
  damping: 15,
  stiffness: 100,
  mass: 1,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
};
```

## Common Props

All animation components support these common props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Component(s) to animate |
| `delay` | `number` | `0` | Delay before animation starts (ms) |
| `animate` | `boolean` | `true` | Enable/disable animation |
| `style` | `StyleProp<ViewStyle>` | `undefined` | Additional styles |
| `onAnimationComplete` | `() => void` | `undefined` | Callback when animation finishes |

## Tips & Best Practices

1. **Performance**: Use `animate={false}` to disable animations during testing or for accessibility
2. **Delays**: Keep delays short (50-200ms) for better UX
3. **Stagger**: Use 75-150ms stagger for list items
4. **Composition**: Combine different animations for unique effects
5. **Conditional**: Toggle `animate` prop based on state for re-triggering animations

## TypeScript

Full TypeScript support with exported types:

```tsx
import type {
  FadeInProps,
  SlideInProps,
  ScaleInProps,
  AnimationDirection,
} from './animations';
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
