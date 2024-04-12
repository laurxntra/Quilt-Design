import * as assert from 'assert';
import { NW, NE, SW, SE, GREEN, RED, ROUND, STRAIGHT, Square, rnil, rcons, qnil, qcons } from './quilt';
import { sflip_vert, rflip_vert, qflip_vert, sflip_horz, rflip_horz, qflip_horz, sew, symmetrize } from './quilt_ops';


describe('quilt_ops', function() {

  // Feel free to use these consts in your tests (though it's not required)
  // and create any others you find useful!

  const nw_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: NW};
  // const nw_rnd_red: Square = {shape: ROUND, color: RED, corner: NW};
  // const nw_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: NW};
  const nw_strt_red: Square = {shape: STRAIGHT, color: RED, corner: NW};

  const ne_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: NE};
  // const ne_rnd_red: Square = {shape: ROUND, color: RED, corner: NE};
  // const ne_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: NE};
  // const ne_strt_red: Square = {shape: STRAIGHT, color: RED, corner: NE};

  const se_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: SE};
  const se_rnd_red: Square = {shape: ROUND, color: RED, corner: SE};
  // const se_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: SE};
  // const se_strt_red: Square = {shape: STRAIGHT, color: RED, corner: SE};

  const sw_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: SW};
  const sw_rnd_red: Square = {shape: ROUND, color: RED, corner: SW};
  // const sw_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: SW};
  const sw_strt_red: Square = {shape: STRAIGHT, color: RED, corner: SW};

  const r_nw_rnd_grn = rcons(nw_rnd_grn, rnil);
  const r_ne_rnd_grn = rcons(ne_rnd_grn, rnil);
  const r_rnd_grn = rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil));
  const r_sew_rnd_grn = rcons(se_rnd_grn, rcons(sw_rnd_grn, rnil));
  const r_swe_rnd_grn = rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil));
  const r3_rnd_grn = rcons(nw_rnd_grn, rcons(ne_rnd_grn, rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil))));
  const r4_rnd_grn = rcons(se_rnd_grn, rcons(sw_rnd_grn, rcons(se_rnd_grn, rcons(sw_rnd_grn, rnil))));


  it('sflip_vert', function() {
    // TODO: add more sflip_vert tests beyond this random example test
    assert.deepStrictEqual(sflip_vert(sw_strt_red), nw_strt_red);
  });

  it('rflip_vert', function() {
    // TODO: add more rflip_vert tests beyond this random example test
    assert.deepStrictEqual(rflip_vert(rnil), rnil);
  });

  it('qflip_vert', function() {
    // TODO: add more qflip_vert tests beyond this random example test
    assert.deepStrictEqual(qflip_vert(qcons(r_nw_rnd_grn, qnil)),
        qcons(rcons(sw_rnd_grn, rnil), qnil));
  });

  it('sflip_horz', function() {
    // TODO: add more sflip_horz tests beyond this random example test
    assert.deepStrictEqual(sflip_horz(sw_rnd_red), se_rnd_red);
  });

  it('rflip_horz', function() {
    // TODO: add more rflip_horz tests beyond this random example test
    assert.deepStrictEqual(rflip_horz(r_nw_rnd_grn), r_ne_rnd_grn);
  });

  it('qflip_horz', function() {
    // TODO: add more qflip_horz tests beyond this random example test
    assert.deepStrictEqual(
        qflip_horz(qcons(r_ne_rnd_grn, qcons(r_nw_rnd_grn, qnil))),
        qcons(r_nw_rnd_grn, qcons(r_ne_rnd_grn, qnil)));
  });



  it('sew', function() {
    // invalid case: (qnil, !qnil)
    assert.throws(() => sew(qnil, qcons(r_rnd_grn, qnil)), Error);
    assert.throws(() => sew(qnil, qcons(r_rnd_grn, qcons(r_rnd_grn, qnil))), Error);

    // invalid case: (!qnil, qnil)
    assert.throws(() => sew(qcons(r_rnd_grn, qnil), qnil), Error);
    assert.throws(() => sew(qcons(r_rnd_grn, qcons(r_rnd_grn, qnil)), qnil), Error);

    // 0-1-many: base case
    assert.deepStrictEqual(sew(qnil, qnil), qnil);

    // 0-1-many: one recursive call
    assert.deepStrictEqual(sew(qcons(r_rnd_grn, qnil), qcons(r_rnd_grn, qnil)), qcons(r3_rnd_grn, qnil));
    assert.deepStrictEqual(sew(qcons(r_sew_rnd_grn, qnil), qcons(r_sew_rnd_grn, qnil)), qcons(r4_rnd_grn, qnil));

    // 0-1-many: many recursive calls
    assert.deepStrictEqual(
        sew(qcons(r_rnd_grn, qcons(r_rnd_grn, qnil)), qcons(r_rnd_grn, qcons(r_rnd_grn, qnil))),
        qcons(r3_rnd_grn, qcons(r3_rnd_grn, qnil)));
    assert.deepStrictEqual(
        sew(qcons(r_sew_rnd_grn, qcons(r_sew_rnd_grn, qcons(r_sew_rnd_grn, qnil))), 
            qcons(r_sew_rnd_grn, qcons(r_sew_rnd_grn, qcons(r_sew_rnd_grn, qnil)))),
        qcons(r4_rnd_grn, qcons(r4_rnd_grn, qcons(r4_rnd_grn, qnil))));
  });

  it('symmetrize', function() {
    // 0-1-many: base case
    assert.deepStrictEqual(symmetrize(qnil), qnil);
    assert.deepStrictEqual(symmetrize(qcons(rcons(nw_rnd_grn, rnil), qnil)),
        qcons(rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)),
            qcons(rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)), qnil)));

    // 0-1-many: one recursive call
    assert.deepStrictEqual(symmetrize(qcons(rcons(nw_rnd_grn, rnil), qnil)),
        qcons(rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)),
            qcons(rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)), qnil)));
    assert.deepStrictEqual(symmetrize(qcons(rcons(se_rnd_grn, rnil), qnil)),
        qcons(rcons(se_rnd_grn, rcons(sw_rnd_grn, rnil)),
            qcons(rcons(ne_rnd_grn, rcons(nw_rnd_grn, rnil)), qnil)));

    // 0-1-many: many recursive calls
    assert.deepStrictEqual(symmetrize(qcons(r_rnd_grn, qnil)),
        qcons(
            rcons(nw_rnd_grn, rcons(ne_rnd_grn, rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)))),
            qcons(
                rcons(sw_rnd_grn, rcons(se_rnd_grn, rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)))),
                qnil)));
    assert.deepStrictEqual(symmetrize(qcons(r_rnd_grn, qcons(r_swe_rnd_grn, qnil))),
        qcons(
            rcons(nw_rnd_grn, rcons(ne_rnd_grn, rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)))),
            qcons(
                rcons(sw_rnd_grn, rcons(se_rnd_grn, rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)))),
                qcons(
                    rcons(nw_rnd_grn, rcons(ne_rnd_grn, rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)))),
                    qcons(
                        rcons(sw_rnd_grn, rcons(se_rnd_grn, rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)))),
                        qnil)))));
  });

});
