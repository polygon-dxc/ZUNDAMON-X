import { FC } from 'react';
import { emotionType } from '../types';
import voice_style_data from '../data/voice_style_data.json';
type Props = {
  emotionType: emotionType;
  isMouseOpen: boolean;
  comment: string;
  selectedCharactor: string;
};

const ZundamonModel: FC<Props> = ({ isMouseOpen, comment, emotionType, selectedCharactor }) => {
  chrome.storage.sync.get(['selectedCharacter'], function (result) {
    console.log('Value currently is ' + result.selectedCharacter);
  });
  const getImageUrl = voice_style_data.find(
    (data: { id: string }) => data.id === selectedCharactor
  )?.image_url;
  return (
    <div
      style={{
        width: '1000px',
        height: '100px',
        position: 'absolute',
        top: -120,
        right: 0,
      }}
    >
      {comment !== '' && (
        <div
          style={{
            padding: '12px',
            border: '2px solid black',
            borderRadius: '12px',
            position: 'absolute',
            bottom: '50px',
            right: '200px',
            backgroundColor: 'white',
            zIndex: 100,
            fontWeight: 'bold',
            maxWidth: '700px',
            fontSize: '32px',
          }}
        >
          {comment}
        </div>
      )}
      <div
        style={{
          width: '230px',
          zIndex: 90,
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      >
        <div
          style={{
            position: 'relative',
            zIndex: 100,
            width: '120px',
            height: '180px',
            display: 'flex',
            top: '100px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'absolute', zIndex: 0, top: '0px' }}>
            <div>
              <div
                style={{
                  width: '104px',
                  height: '108px',
                  borderRadius: '200px',
                  border: '8px solid black',
                  boxShadow: '0px 10px 10px -6px rgba(5, 4, 4, 0.3)',
                  top: 0,
                  backgroundColor: '#E1ECC8',
                }}
              ></div>
            </div>
          </div>

          <div style={{ zIndex: 2, top: '64px', position: 'absolute' }}>
            <div style={{ width: '120px', height: '60px', position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  width: '104px',
                  height: '160px',
                  position: 'absolute',
                  borderBottomLeftRadius: '200px',
                  borderBottomRightRadius: '200px',
                  border: '8px solid rgba(0, 0, 0, 0)',
                  bottom: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {/* データがない時にもずんだもんは表示したままにする。 */}
                <img
                  src={chrome.runtime.getURL(
                    selectedCharactor === 'ずんだもん' || !selectedCharactor
                      ? `images/zunndamonImg/${emotionType}/${emotionType}_${
                          isMouseOpen ? '開口' : '閉口'
                        }.png`
                      : getImageUrl
                  )}
                  style={{
                    borderBottomLeftRadius: '100px',
                    borderBottomRightRadius: '100px',
                    height: '300px',
                    position: 'absolute',
                    top: 0,
                    zIndex: 1,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZundamonModel;
