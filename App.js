import React, {useRef, useEffect, useState} from 'react';
import {Animated, Image, Text, TouchableOpacity, View} from 'react-native';

const FadeInView = props => {
  const bubble1 = useRef(new Animated.Value(10)).current; // Initial value for opacity: 0
  const bubble2 = useRef(new Animated.Value(10)).current; // Initial value for opacity: 0
  const bubble3 = useRef(new Animated.Value(10)).current; // Initial value for opacity: 0

  useEffect(() => {
    let loop1 = 100;
    let loop2 = 100;
    let loop3 = 100;

    if (props.clicked) {
      const index = props.index;
      if (index < 3) {
        loop1 = 130;
      } else if (index < 6) {
        loop2 = 130;
      } else {
        loop3 = 130;
      }
    }

    Animated.loop(
      Animated.timing(bubble1, {
        toValue: loop1,
        duration: 400,
        delay: 2000,
        useNativeDriver: false,
      }),
    ).start();

    Animated.loop(
      Animated.timing(bubble2, {
        toValue: loop2,
        duration: 400,
        delay: 2200,
        useNativeDriver: false,

        // useNativeDriver: true
      }),
    ).start();

    Animated.loop(
      Animated.timing(bubble3, {
        toValue: loop3,
        duration: 400,
        delay: 2400,
        useNativeDriver: false,

        // useNativeDriver: true
      }),
    ).start();
  }, [props.clicked]);

  const index = props.index;

  const currentBubble = index < 3 ? bubble1 : index < 6 ? bubble2 : bubble3;

  return (
    <View style={{position: 'relative'}}>
      <Animated.View
        style={{
          ...props.style,
          width: currentBubble,
          height: currentBubble,
          borderRadius: 100,
          opacity: currentBubble,
        }}>
        <Image
          style={{borderRadius: 100, width: '100%', height: '100%'}}
          source={{uri: props.image}}
        />

        {props.children}
      </Animated.View>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}>
        <Text style={{color: 'white', fontWeight: '700'}}>{props.text}</Text>
      </View>

      <View
        style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
        <Animated.View
          style={{
            width: currentBubble,
            height: currentBubble,
            opacity: 0.5,
            backgroundColor: 'black',
            borderRadius: 100,
          }}
        />
      </View>
    </View>
  );
};

const listA = [
  {
    id: 9,
    text: 'Purple',
    list: 'A',
    image:
      'https://1757140519.rsc.cdn77.org/blog/wp-content/uploads/2013/06/jpg.png',
  },
  {
    id: 10,
    text: 'Peach',
    list: 'A',
    image: 'https://i.stack.imgur.com/cdCSj.jpg',
  },
  {
    id: 11,
    text: 'Navy',
    list: 'A',
    image:
      'https://www.coreldraw.com/static/cdgs/images/free-trials/img-ui-cdgsx.jpg',
  },
];

const listB = [
  {
    id: 12,
    text: 'Lime',
    list: 'B',
    image:
      'https://onlinepngtools.com/images/examples-onlinepngtools/palm-fronds-and-sky.jpg',
  },
  {
    id: 13,
    text: 'Aqua',
    list: 'B',
    image: 'https://wallpaperaccess.com/full/4723250.jpg',
  },
  {
    id: 14,
    text: 'Orange',
    list: 'B',
    image: 'https://fileinfo.com/img/ss/sm/jpg_44.png',
  },
];

const save = [];

export default () => {
  const [data, setData] = useState([
    {
      id: 1,
      text: 'Black',
      list: 'A',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBePZO6gOE1ZxDYheKnzckJZlR-LpeCJgSZA&usqp=CAU',
    },
    {
      id: 2,
      text: 'Blue',
      list: 'A',
      image:
        'https://images.ctfassets.net/hrltx12pl8hq/4plHDVeTkWuFMihxQnzBSb/aea2f06d675c3d710d095306e377382f/shutterstock_554314555_copy.jpg',
    },
    {
      id: 3,
      text: 'Green',
      list: 'A',
      image:
        'https://img.freepik.com/free-photo/closeup-beautiful-green-leaves_23-2148245094.jpg?size=626&ext=jpg',
    },
    {
      id: 4,
      text: 'Red',
      list: 'A',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/b/b4/JPEG_example_JPG_RIP_100.jpg',
    },
    {
      id: 5,
      text: 'Brown',
      list: 'B',
      image: 'https://kinsta.com/wp-content/uploads/2020/08/tiger-jpg.jpg',
    },
    {
      id: 6,
      text: 'Bleed',
      list: 'B',
      image: 'https://tinyjpg.com/images/social/website.jpg',
    },
    {
      id: 7,
      text: 'Pink',
      list: 'B',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg',
    },
    {
      id: 8,
      text: 'Violet',
      list: 'B',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Moon.jpg',
    },
  ]);

  const [clicked, setClicked] = useState(-1);

  const getRandomItem = list => {
    const randomNum = Math.floor(Math.random() * list.length);
    return list[randomNum];
  };

  const onRemove = (item, index) => {
    setClicked(-1);
    const dupData = [...data];
    const clickedBubble = item;

    if (clickedBubble.list == 'A') {
      const item = getRandomItem(listA);

      const findIndex = listA.findIndex(elem => elem.id == item.id);
      listA.splice(findIndex, 1);
      listA.push(clickedBubble);

      dupData[index] = item;

      setData(dupData);
    } else {
      const item = getRandomItem(listB);

      const findIndex = listB.findIndex(elem => elem.id == item.id);
      listB.splice(findIndex, 1);
      listB.push(clickedBubble);

      dupData[index] = item;
      setData(dupData);
    }
  };

  const saveBubble = (item, index) => {
    save.push(item);
    // setClicked(index)
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {data.map((elem, index) => (
          <View key={index} style={{position: 'relative'}}>
            <TouchableOpacity
              onPress={() => saveBubble(elem, index)}
              onLongPress={() => onRemove(elem, index)}
              style={{height: 100, borderRadius: 130, width: 100, margin: 10}}>
              <FadeInView
                clicked={index == clicked}
                index={index}
                text={elem.text}
                image={elem.image}
                style={{alignItems: 'center', justifyContent: 'center'}}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};
