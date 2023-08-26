import { FC } from 'react';
import image1 from '../../public/images/zundamon_content0000.png';
import image2 from '../../public/images/zundamon_content0001.png';
import { emotionType } from '../types';
type Props = {
  emotionType: emotionType;
  isMouseOpen: boolean;
  comment: string;
};
const ZundamonModel: FC<Props> = ({ isMouseOpen, comment, emotionType }) => {
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
                    `images/zunndamonImg/${emotionType}/${emotionType}_${
                      isMouseOpen ? '開口' : '閉口'
                    }.png`
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
