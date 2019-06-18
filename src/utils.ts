import { R } from 'lib/utils'
import { FormConfig, FieldState } from './types'

export const prepareFormInitialState = (formConfig: FormConfig) => {
    const preparedPairs = R.toPairs(formConfig)
        .map(([ fieldName, config ]) => {
            const isValidInputValue = R.is(String, config.value) || R.is(Number, config.value)

            return [fieldName, {
                isValid: Boolean(config.value),
                isRequired: config.isRequired,
                value: isValidInputValue ? config.value : '',
                fieldType: config.fieldType
            }]
        }) as Array<[string, FieldState]>

    return R.fromPairs(preparedPairs)
}
