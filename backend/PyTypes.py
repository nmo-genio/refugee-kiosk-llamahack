from pydantic import BaseModel, Field


class ImageType(BaseModel):
    isForm: bool = Field(
        description="Indicates if the image is a form or legal paperwork"
    )
    isDirections: bool = Field(
        description="Indicates if the image contains text with directions"
    )
    isNote: bool = Field(description="Indicates if the image is a hand written note")
    isOtherText: bool = Field(description="Indicates if the image has other text")


class FormDetails(BaseModel):
    formNumber: str = Field(description="The form number of the image")
    language: str = Field(
        description="The primary language of the image indetified in the ISO 639-1 format code, e.g. 'en' for English, 'es' for Spanish, 'fr' for French, etc. This is a two-letter code. If the language is not identified, this field should be set to 'nx'.",
        pattern="^[a-z]{2}$",
        title="Language Code",
    )
    issuingAuthority: str = Field(
        description="The issuing authority of the form. This is either a country or an international organization, e.g. 'UNHCR', 'United States', and 'Greece'"
    )
