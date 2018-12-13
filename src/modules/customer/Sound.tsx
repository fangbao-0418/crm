import React from 'react'
const volume = require('@/assets/images/volume.gif')
const volumeOff = require('@/assets/images/volume-off.png')
interface Props {
  url: string
  playing?: boolean
  onClick?: () => void
}
class Main extends React.Component<Props> {
  public state = {
    playing: false
  }
  public el: HTMLAudioElement
  public componentDidMount () {
    this.el = document.createElement('audio')
    this.el.setAttribute('src', this.props.url)
    this.el.setAttribute('id', 'record')
    this.el.onpause = () => {
      this.setState({
        playing: false
      })
    }
  }
  public componentWillReceiveProps (props: Props) {
    if (props.playing && this.state.playing) {
      this.el.play()
    } else {
      this.el.currentTime = 0
      this.el.pause()
    }
  }
  public componentWillUnmount () {
    this.el.pause()
    this.el.remove()
  }
  public render () {
    return (
      <span
        style={{
          width: 16,
          height: 14,
          background: `url(${this.state.playing ? volume : volumeOff}) 0 center / 100% 100% no-repeat`,
          display: 'inline-block',
          verticalAlign: 'sub',
          cursor: 'pointer'
        }}
        onClick={() => {
          const playing = this.state.playing
          if (playing) {
            this.el.pause()
          } else {
            this.el.currentTime = 0
            this.el.play()
          }
          this.setState({
            playing: !playing
          }, () => {
            if (this.props.onClick) {
              this.props.onClick()
            }
          })
        }}
      >
      </span>
    )
  }
}
export default Main
