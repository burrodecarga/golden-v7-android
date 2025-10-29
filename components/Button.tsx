import { Paleta } from '@/constants/Colors'
import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

type ButtonProps={
  title: string
  onPress: () => void
  variant?: 'primary'|'secondary'|'outline'|'danger'
  size?: 'small'|'medium'|'large'
  disabled?: boolean
  loading?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
  icon?: React.ReactNode
}

export default function Button({
  title,
  onPress,
  variant='primary',
  size='medium',
  disabled=false,
  loading=false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const getVariantStyles=(): { container: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case 'secondary':
        return {
          container: {
            backgroundColor: Paleta.background,
          },
          text: {
            color: '#FFFFFF',
          },
        }
      case 'outline':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: Paleta.textSecondary,
          },
          text: {
            color: Paleta.textSecondary,
          },
        }
      case 'danger':
        return {
          container: {
            backgroundColor: Paleta.danger,
          },
          text: {
            color: '#FFFFFF',
          },
        }
      default:
        return {
          container: {
            backgroundColor: Paleta.primary,
          },
          text: {
            color: '#FFFFFF',
          },
        }
    }
  }

  const getSizeStyles=(): { container: ViewStyle; text: TextStyle } => {
    switch (size) {
      case 'small':
        return {
          container: {
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 8,
          },
          text: {
            fontSize: 12,
          },
        }
      case 'large':
        return {
          container: {
            paddingVertical: 16,
            paddingHorizontal: 24,
            borderRadius: 12,
          },
          text: {
            fontSize: 18,
          },
        }
      default:
        return {
          container: {
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 10,
          },
          text: {
            fontSize: 16,
          },
        }
    }
  }

  const variantStyles=getVariantStyles()
  const sizeStyles=getSizeStyles()

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles.container,
        sizeStyles.container,
        disabled&&styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled||loading}
      activeOpacity={0.4}
    >
      {loading? (
        <ActivityIndicator
          color={variant==='outline'? Paleta.primary:'#FFFFFF'}
          size="small"
        />
      ):(
        <>
          {icon&&<View style={styles.iconContainer}>{icon}</View>}
          <Text
            style={[
              styles.text,
              variantStyles.text,
              sizeStyles.text,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  )
}

const styles=StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  iconContainer: {
    marginRight: 8,
  },
})