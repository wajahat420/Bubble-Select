import React, { useRef, useEffect } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

  const data = [
    {id:1, text:'Black'},
    {id:1, text:'Blue'},
    {id:1, text:'Green'},
    {id:1, text:'Red'},
    {id:1, text:'Brown'},
    {id:1, text:'Bleed'},
  ]

const FadeInView = (props) => {
  const bubble1 = useRef(new Animated.Value(10)).current  // Initial value for opacity: 0
  const bubble2 = useRef(new Animated.Value(10)).current  // Initial value for opacity: 0
  const bubble3 = useRef(new Animated.Value(10)).current  // Initial value for opacity: 0


  useEffect(() => {
    Animated.loop(Animated.timing(
      bubble1,
      {
        toValue: 100,
        duration: 700,
        delay:1000,
      }
    )).start();

    Animated.loop(Animated.timing(
      bubble2,
      {
        toValue: 100,
        duration: 700,
        delay:1100,
      }
    )).start();
  }, [])


  const index = props.index

  const currentBubble = index < 3 ? bubble1 : index < 6 ? bubble2 : bubble3

  return (
    <Animated.View     
      style={{
        ...props.style,
        width:  currentBubble,
        height:currentBubble,
        borderRadius:100,
        opacity: currentBubble,        
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <View style={{flexDirection:'row', flexWrap:'wrap', alignItems:'center', justifyContent:'center'}}>
      {
        data.map((elem, index) => (
          <TouchableOpacity style={{height:100, width:100,marginTop:5, marginRight:5}}>
            <FadeInView index={index} style={{ alignItems:'center', justifyContent:'center', backgroundColor: 'powderblue'}}>
              <Text style={{fontSize: 16, fontWeight:'700', textAlign: 'center', margin: 10}}>{ elem.text }</Text>
            </FadeInView>
          </TouchableOpacity>
        ))
      }
    </View>
    </View>
  )
}