import Text from '../atoms/Text';   

export function Texts({ items = [] }) {
  return (
    <>
      {items.map((item, index) => (
        <Text key={index} variant={item.variant} className={item.className}>
          {item.text}
        </Text>
      ))}
    </>
  );
}