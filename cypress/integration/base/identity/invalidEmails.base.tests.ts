import RegistrationPage from '../../../pages/identity/registration/Registration'
import { tQueryParams } from '../../../utils/types/identity.types'
import { clients, portalClient } from '../../../data/clients/clients'
import { RegistrationLoc } from '../../../utils/localization'
import { userBodies } from '../../../utils/generate.helpers'

describe('Регистрация с невалидным Email', () => {

    const regPage = new RegistrationPage
    const client: tQueryParams = clients(portalClient)

    const emails: string[] = [
        'aa/lychko1721@omgau.org',
        'ee/podlesnaya1721@omgau.org',
        'sample@email.tst<script>9zv1(9679)</script>',
        'sample@email.tst<ScR<ScRiPt>IpT>9zv1(9259)</sCr<ScRiPt>IpT>',
        'sample@email.tst}body{acu:Expre/**/SSion(9zv1(9881))}',
        'sample@email.tst"sTYLe=\'acu:Expre/**/SSion(9zv1(9201))\'bad="',
        'sample@email.tst"><script>9zv1(9821)</script>',
        '../5556660606',
        './sample@email.tst',
        'sample@email.tst<script>jl3A(9505)</script>',
        'sample@email.tst<ScR<ScRiPt>IpT>jl3A(9556)</sCr<ScRiPt>IpT>',
        'sample@email.tst}body{acu:Expre/**/SSion(jl3A(9079))}',
        'sample@email.tst"sTYLe=\'acu:Expre/**/SSion(jl3A(9979))\'bad="',
        'sample@email.tst"><script>jl3A(9845)</script>',
        'elbakieva/e1412@icloud.com',
        'Dzhindzhoriia.gg@students/dvfu.ru',
        'podryginamaria@gmail/.com',
        'lena/emeljanova/4@gmail.com',
        'katya/devyatkina.2000@mail.ru',
        'cool/icyc@yandex.ru',
        'davletchina/liana@mail.ru',
        'zverev+valeriy/123@gmail.com',
        'sample@email.tst<a10BSBf<',
        'sample@email.tst<a0KXfzV<',
        '<EGrichenkova@artek.org>',
        '<bna@r36.tambov.gov.ru>',
        'dasha/sam01@mail.ru',
        'igor.tryakshin|@bk.ru',
        'vinokurova!02@mail.ru',
        'tory/ka2000@mail.ru',
        'oksana/poteshkina@mail.ru',
        'marina.konovalenko/69@mail.ru',
        'davletchina/liana@mail.ru',
        'uo/khasanova@mail.ru',
        'lena/voronczova.83@mail.ru',
        'anastasia.rubсova2010@gmail.com',
        'vaxrameeva.a.v.@mail.ru',
        'alinalogunova009@gmail.com.',
        'kolesnikova.nv@edu.spbstu.u',
        'aa@lychko1721@omgau.org',
        'sodiqovovorifjоn32@gmail.com'
    ]

    before(() => {
        const user = userBodies.defaultUserEmailBody()
        delete user.Email
        cy.visitRegistration(client)
        regPage.form.setValuesRegForm(user)
        regPage.form.agree.checkbox.check()
    })

    emails.forEach((email) => {
        it(`Отображение ошибки Неверный формат E-mail: ${email}`, () => {
            regPage.form.email.clear()
            regPage.form.email.setValue(email)
            regPage.form.btnSubmit.click()
            regPage.form.email.errorHint().invoke('text')
                .then((text) => {
                    expect(text).to.eq(RegistrationLoc.EMAIL_ERROR_HINT)
                })
        })
    })
})
